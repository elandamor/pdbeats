import React, { FC, useContext, useEffect, useState } from 'react';
import { Howl } from 'howler';
// Styles
import Wrapper from './styles';

import Controls from '../Controls';
import Flex from '../Flex';
import ProgressBar from '../ProgressBar';
import VolumeBar from '../VolumeBar';

import { OnDeckContext } from '../../contexts/OnDeck.context';
import { PlaylistContext } from '../../contexts/Playlist.context';

import * as testAudio from '!file-loader?name=[name].[ext]!../../data/kygo-happy-now.opus';

import { makeDebugger } from 'utils';
const debug = makeDebugger('Player');

interface IPlayerProps {}

const progressMax = 100;

/**
 * @render react
 * @name Player container
 * @description Player container.
 * @example
 * <Player />
 */

const Player: FC<IPlayerProps> = () => {
  const onDeckCtx = useContext(OnDeckContext);
  const { playlist } = useContext(PlaylistContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  const _step = () => {
    // Get the Howl we want to manipulate.
    const sound = playlist[currentIndex].howl;

    // Determine our current seek position.
    const seek = sound.seek() || 0;

    const newProgress = Math.ceil(((seek / sound.duration()) * progressMax)) || 0;
    setProgress(newProgress);

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(_step);
    }
  }

  /**
   * Play a sound in the playlist.
   * @param {Number} index Index of the sound in the playlist..
   */
  const _play = (index?: number) => {
    let sound: Howl;

    index = typeof index === 'number' ? index : currentIndex;
    const data: ITrack = playlist[currentIndex];

    if (!data) {
      return;
    }

    // If we already loaded this sound, use the current one.
    if (data.howl) {
      sound = data.howl;
    } else { // Otherwise, setup and load a new Howl.
      sound = data.howl = new Howl({
        src: [data.audio ? data.audio.url : testAudio],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: () => {
          onDeckCtx.updatePlayState('playing');
          requestAnimationFrame(_step);
        },
        onpause: () => {
          onDeckCtx.updatePlayState('paused');
        },
        onend: () => {
          setProgress(0);
          onDeckCtx.updatePlayState('idle');
        },
        onseek: () => {
          // Start updating the progress of the track.
          requestAnimationFrame(_step);
        }
      });
    }

    // Begin playing the sound.
    sound.play()

    onDeckCtx.setOnDeck(data);

    // Keep track of the index we are currently playing.
    setCurrentIndex(index);
  };

  /**
   * Pause the currently playing sound.
   */
  const _pause = () => {
    // Get the Howl we want to manipulate.
    const sound = playlist[currentIndex].howl;

    // Pause the sound.
    sound.pause();
  };

  /**
   * Skip to a specific sound based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  const _skipTo = (index: number) => {
    // Stop the current track.
    if (playlist[currentIndex] && playlist[currentIndex].howl) {
      playlist[currentIndex].howl.stop();
    }

    setProgress(0);

    // Play the new track.
    _play(index);
  }

  /**
   * Seek to a new position in the currently playing track.
   * @param {Number} per Percentage through the song to skip.
   */
  const _seek = (per: number) => {
    // Get the Howl we want to manipulate.
    const audio = playlist[currentIndex].howl;

    // Convert the percent into a seek position.
    if (audio.playing()) {
      audio.seek(audio.duration() * per);
    }
  }

    /**
   * Handles playback control events.
   * @param {String} action The playback event that has occured.
   */
  const _handleControls = (action: string) => {
    switch (action) {
      case 'pause':
        _pause();
        break;
      case 'play':
        _play();
        break;
      default:
        break;
    }
  };

  const _handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === 'progress') {
      const skipPercentage = value / progressMax;
      _seek(skipPercentage);
    }
  }

  useEffect(() => {
    _skipTo(playlist.indexOf(onDeckCtx.source));
  }, [onDeckCtx.source]);

  debug(progress);

  return (
    <Wrapper className="c-player" flexDirection="column">
      <ProgressBar
        onChange={_handleChange}
        progress={progress}
        my={-2}
      />
      <Flex>
        <Flex size="none" width="320px" />
        <Flex justifyContent="center">
          <Controls onChange={(action: string) => _handleControls(action)} />
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end" size="none" width="320px">
          <VolumeBar volume={5} />
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default Player;
