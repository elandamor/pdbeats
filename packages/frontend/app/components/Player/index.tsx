import React, { PureComponent } from 'react';
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
import { OnDeckContext } from '../../contexts/OnDeck.context';

import { debug } from '../../lib';

import * as audio from '!file-loader?name=[name].[ext]!../../data/kygo-happy-now.opus';

const LoSto__VolumeKey = 'pdDB__volume';

/**
 * nowPlaying: Array containing now playing song
 * upNext: Array of upcoming songs added to upNext
 */

interface IProps {
  onDeck?: object;
  playlist: Array<object>;
  className?: string;
}

interface IState {
  currentlyPlayingType: 'album' | 'podcast' | 'track'
  isMuted: boolean;
  [key: string]: any;
}

/**
 * @render react
 * @name Player container
 * @description Player container.
 * @example
 * <Player playlist={PLAYLIST} />
 */

class Player extends PureComponent<IProps, IState> {
  protected componentIsMounted: boolean;
  protected index: number;
  protected onDeck: object;
  protected playlist: Array<any>;
  protected track: Howl;

  protected progressMax = 100;
  protected volumeMax = 10;
  // tslint:disable-next-line:no-magic-numbers
  protected volumeMid = this.volumeMax / 2;

  static contextType = OnDeckContext;

  state:IState = {
    nowPlaying: {},
    nowPlayingDuration: 0,
    nowPlayingSeek: 0,
    currentlyPlayingType: 'track',
    isMuted: false,
    isPlaying: false,
    progress: 0,
    volume: localStorage.getItem(LoSto__VolumeKey) || this.volumeMax,
  }

  public componentDidMount() {
    this.componentIsMounted = true;

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

  public componentDidUpdate() {
    const { onDeck: ctxOnDeck } = this.context;
    const { nowPlaying: previousOnDeck } = this.state;

    if (ctxOnDeck && previousOnDeck) {
      if (ctxOnDeck.id && ctxOnDeck.id !== previousOnDeck.id) {
        // TODO Get where currentTrack is being played from Album, Songs, Playlist?
        // TODO load(Album/Songs/Playlist) to upNext(playlist).
        // TODO Do not double push a track that already exists at end of list.
        this.playlist.push(ctxOnDeck);
        // Play selected track.
        this.skipTo(this.playlist.indexOf(ctxOnDeck));
      }
    }
  }

  public componentWillUnmount() {
    this.componentIsMounted = false;
  }

  public setState(nextState: any, cb?: () => void) {
    if (this.componentIsMounted) {
      super.setState(nextState, cb);
    }
  }

  public render() {
    const { className } = this.props;
    const { currentlyPlayingType, nowPlaying } = this.state;

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
          {nowPlaying.artists && nowPlaying.artists.map((artist: any) => (
              <span
                key={artist.id}
                className="a-artist"
              >
                <span>
                  {artist.name}
                </span>
              </span>
            )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
          <div>
            {
              nowPlaying.name && (
                <React.Fragment>
                  {nowPlaying.name}
                  {
                    nowPlaying.featuring &&
                    nowPlaying.featuring.length > 0 && (
                      <React.Fragment>
                        &nbsp;
                        (
                        <span className="a-feat">feat. </span>
                        {nowPlaying.featuring.map((artist: any) => (
                          <span
                            key={artist.id}
                            className="a-artist"
                          >
                            {artist.name}
                          </span>
                        )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                        )
                      </React.Fragment>
                    )
                  }
                </React.Fragment>
              )
            }
          </div>
        </div>
        <div>
          <span>{secondsToTime(this.state.nowPlayingSeek || 0)}</span>
          <span>{secondsToTime(this.state.nowPlayingDuration)}</span>
        </div>
        <Controls
          isPlaying={this.state.isPlaying}
          onChange={(action) => this.handleControls(action)}
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
          !this.state.isMuted && this.state.volume >= 1 &&
          this.state.volume <= this.volumeMid && <Volume1 />
        }
        {
          !this.state.isMuted && this.state.volume > this.volumeMid &&
          <Volume2 />
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
   * Handles playback control events.
   * @param {String} action The playback event that has occured.
   */
  private handleControls = (action: string) => {
    switch (action) {
      case 'next':
        this.skip('next');
        break;
      case 'pause':
        this.pause();
        break;
      case 'play':
        this.play();
        break;
      case 'prev':
        this.skip('prev');
        break;
      default:
        break;
    }
  }

  /**
   * Play a song in the playlist.
   * @param {Number} index Index of the song in the playlist..
   */
  private play(index?: number) {
    let track: Howl;

    index = typeof index === 'number' ? index : this.index;
    const data: any = this.playlist[index];

    if (!data) {
      debug('noData');
      return;
    }

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      track = data.howl;
    } else {
      track = data.howl = new Howl({
        // ! Change this to data.source in production.
        src: [audio],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onload: () => {
          this.setState({
            nowPlayingDuration: track.duration(),
            currentlyPlayingType: data.__typename ? data.__typename.toLowerCase() : 'track',
          });
        },
        onplay: () => {
          this.setState(() => ({
            nowPlayingDuration: track.duration(),
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
            nowPlayingDuration: 0,
            nowPlayingSeek: 0,
            isPlaying: false,
            progress: 0,
          }), () => {
            this.context.setOnDeck({});

            this.setState({
              nowPlaying: {},
            });
            // Remove nowPlaying from deck
            // this.playlist.splice(this.playlist.indexOf(track), 1);

            // if (this.playlist.length > 0) {
            //   this.skip('next');
            // }
          });
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
      nowPlaying: {
        __typename: data.__typename || 'track',
        ...data
      },
    });

    this.context.setOnDeck(data);

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
    if (this.playlist[this.index] && this.playlist[this.index].howl) {
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
    this.setState(({ isMuted }: IState) => ({
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
      track.seek(track.duration() * per);
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
    const progress = parseInt(((seek / track.duration()) * this.progressMax) || 0, 10);

    this.setState({
      // @ts-ignore
      nowPlayingSeek: Math.round(seek || 0),
      progress
    })

    // If the track is still playing, continue stepping.
    if (track.playing()) {
      requestAnimationFrame(this.step);
    }
  }
}

export default Player;
