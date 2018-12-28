import React, { Component } from 'react';
import classNames from 'classnames';
import { Howl, Howler } from 'howler';
import { Volume, Volume1, Volume2, VolumeX } from 'react-feather';
// Styles
import Wrapper from './styles';
import { secondsToTime } from '../../lib';

import Button from '../Button';
import Controls from '../Controls';
import ProgressBar from '../ProgressBar';
import VolumeBar from '../VolumeBar';

import { debug } from '../../lib';

const LoSto__VolumeKey = 'pdDB__volume';

interface IProps {
  onDeck?: object;
  playlist: Array<object>;
  className?: string;
}

interface IState {
  currentlyPlayingType: 'album' | 'podcast' | 'track'
  [key: string]: any;
}

/**
 * @render react
 * @name Player container
 * @description Player container.
 * @example
 * <Player playlist={PLAYLIST} />
 */

class Player extends Component<IProps, IState> {
  protected index: number;
  protected onDeck: object;
  protected playlist: Array<any>;
  protected track: Howl;

  protected progressMax = 100;
  protected volumeMax = 10;

  state:IState = {
    currentTrack: null,
    currentTrackDuration: 0,
    currentTrackSeek: 0,
    currentlyPlayingType: 'track',
    isMuted: false,
    isPlaying: false,
    progress: 0,
    volume: localStorage.getItem(LoSto__VolumeKey) || this.volumeMax,
  }

  componentDidMount() {
    const { onDeck, playlist } = this.props;

    this.onDeck = onDeck || {};
    this.playlist = playlist;
    this.index = 0;

    const defaultVolume = localStorage.getItem(LoSto__VolumeKey) || this.volumeMax;
    // @ts-ignore
    Howler.volume(parseFloat(defaultVolume/this.volumeMax));
    // Unload any track that may be loaded
    Howler.unload();
  }

  public componentDidUpdate({ onDeck: previousOnDeck }: IProps) {
    const { onDeck: currentOnDeck } = this.props;

    if (previousOnDeck && currentOnDeck) {
      if (previousOnDeck.id !== currentOnDeck.id) {
        this.playlist.push(currentOnDeck);
        this.skipTo(this.playlist.indexOf(currentOnDeck));
      }
    }
  }

  public render() {
    const { className } = this.props;
    const { currentlyPlayingType, currentTrack } = this.state;

    debug(this.playlist);

    return (
      <Wrapper
        className={classNames('', className)}
        data-type={currentlyPlayingType}
      >
        <ProgressBar
          onChange={this.handleChange}
          progress={this.state.progress}
        />
        <div>
          {
            currentTrack && `${currentTrack.artist.name} - ${currentTrack.title}`
          }
        </div>
        <div>
          <span>{secondsToTime(this.state.currentTrackSeek || 0)}</span>
          <span>{secondsToTime(this.state.currentTrackDuration)}</span>
        </div>
        <Controls
          isPlaying={this.state.isPlaying}
          onChange={(action) => {
            if (action === 'next') {
              this.skip('next');
            }
            if (action === 'pause') {
              this.pause();
            }
            if (action === 'play') {
              this.play();
            }
            if (action === 'prev') {
              this.skip('prev');
            }
          }}
        />
        <Button
          className={classNames('c-btn--mute', {
            '-muted': this.state.isMuted,
          })}
          onClick={() => this.toggleMute()}
        >
        {
          this.state.isMuted && <VolumeX />
        }
        {
          !this.state.isMuted && this.state.volume < 1 && <Volume />
        }
        {
          !this.state.isMuted && this.state.volume >= 1 && this.state.volume <= 5 && <Volume1 />
        }
        {
          !this.state.isMuted && this.state.volume > 5 && <Volume2 />
        }
        </Button>
        <VolumeBar
          onChange={this.handleChange}
          volume={this.state.volume}
        />
      </Wrapper>
    );
  }

  private handleChange = (event: any) => {
    const { name, value } = event.target;

    if(name === 'progress') {
      this.seek(value / this.progressMax);
      return;
    }

    this.setState({
      [name]: value,
    });

    if (name === 'volume') {
      Howler.volume(value / this.volumeMax);
      localStorage.setItem(LoSto__VolumeKey, value);
    }
  }

  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  private play(index?: number) {
    let track: Howl;

    index = typeof index === 'number' ? index : this.index;
    const data: any = this.playlist[index];

    if (!data) {
      return;
    }

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      track = data.howl;
    } else {
      track = data.howl = new Howl({
        src: [data.source],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onload: () => {
          this.setState({
            currentTrackDuration: track.duration(),
            currentlyPlayingType: 'track',
          });
        },
        onplay: () => {
          this.setState(() => ({
            currentTrackDuration: track.duration(),
            isPlaying: true
          }));

          // Start updating the progress of the track.
          requestAnimationFrame(this.step);
        },
        onpause: () => {
          this.setState(() => ({
            isPlaying: false
          }));
        },
        onend: () => {
          this.setState(() => ({
            isPlaying: true,
            progress: 0,
          }),
          () => this.skip('next'));
        },
        onseek: () => {
          // Start updating the progress of the track.
          requestAnimationFrame(this.step);
        }
      });
    }

    // Begin playing the sound.
    track.play();

    // Update player info
    this.setState({
      currentTrack: {
        __typename: data.__typename,
        artist: data.artist,
        title: data.title,
      },
    })

    // Keep track of the index we are currently playing.
    this.index = index;
  }

  /**
   * Pause the currently playing track.
   */
  private pause = () => {
    // Get the Howl we want to manipulate.
    const track = this.playlist[this.index].howl;

    // Pause the track.
    track.pause();
  }

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  private skip(direction: string) {
    // Get the next track based on the direction of the track.
    let index = 0;

    if (direction === 'prev') {
      index = this.index - 1;
      if (index < 0) {
        index = this.playlist.length - 1;
      }
    } else {
      index = this.index + 1;
      if (index >= this.playlist.length) {
        index = 0;
      }
    }

    this.skipTo(index);
  }

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  private skipTo(index: number) {
    // Stop the current track.
    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
    }

    // Reset progress.
    this.setState({
      progress: 0
    })

    // Play the new track.
    this.play(index);
  }

  /**
   * Toggle the volume mute on/off.
   */
  private toggleMute() {
    this.setState(({ isMuted }) => ({
      isMuted: !isMuted,
    }), () => {
      Howler.mute(this.state.isMuted);
    });
  }

  /**
   * Seek to a new position in the currently playing track.
   * @param {Number} per Percentage through the song to skip.
   */
  private seek = (per: number) => {
    // Get the Howl we want to manipulate.
    const track = this.playlist[this.index].howl;

    // Convert the percent into a seek position.
    if (track.playing()) {
      track.seek(this.state.currentTrackDuration * per);
    }
  }

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  private step = () => {
    // Get the Howl we want to manipulate.
    const track = this.playlist[this.index].howl;

    // Determine our current seek position.
    const seek = track.seek() || 0;
    // @ts-ignore
    const progress = parseInt(((seek / this.state.currentTrackDuration) * this.progressMax) || 0, 10);

    this.setState({
      // @ts-ignore
      currentTrackSeek: Math.round(seek || 0),
      progress
    })

    // If the track is still playing, continue stepping.
    if (track.playing()) {
      requestAnimationFrame(this.step);
    }
  }
}

export default Player;
