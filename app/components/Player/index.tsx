import React, { Component } from 'react';
import classNames from 'classnames';
import { Howl, Howler } from 'howler';
// Styles
import Wrapper from './styles';

interface IProps {
  audio: string;
  className?: string;
}

interface IState {
  [key: string]: any;
}

/**
 * @render react
 * @name Player container
 * @description Player container.
 * @example
 * <Player audio={track} />
 */

class Player extends Component<IProps, IState> {
  protected track: Howl;

  protected volumeMax = 10;

  state:IState = {
    isMuted: false,
    isPlaying: false,
    volume: 1,
  }

  componentDidMount() {
    const { audio } = this.props;

    this.track = new Howl({
      html5: true,
      src: [audio],
      onplay: () => {
        this.setState(({ isPlaying }) => ({
          isPlaying: !isPlaying
        }));
      },
      onpause: () => {
        this.setState(({ isPlaying }) => ({
          isPlaying: !isPlaying
        }));
      }
    });
  }

  public render() {
    const { className } = this.props;

    return (
      <Wrapper className={classNames('c-player', className)}>
        {
          this.state.isPlaying ? (
            <button
              className="c-btn--pause"
              onClick={() => this.pauseTrack()}
            >
              Pause
            </button>
          ) : (
            <button
              className="c-btn--play"
              onClick={() => this.playTrack()}
            >
              Play
            </button>
          )
        }
        <button
          className={classNames('c-btn--mute', {
            '-muted': this.state.isMuted,
          })}
          onClick={() => this.toggleMute()}
        >
        {
          this.state.isMuted ? 'Unmute' : 'Mute'
        }
        </button>
        <div>
          <input
            className="c-volume__bar"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="10"
            // @ts-ignore
            defaultValue={this.state.volume * this.volumeMax}
            onChange={this.handleChange}
          />
        </div>
      </Wrapper>
    );
  }

  private handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    if (event.target.name === 'volume') {
      Howler.volume(event.target.value / this.volumeMax);
    }
  }

  private playTrack() {
    this.track.play();
  }

  private pauseTrack() {
    this.track.pause();
  }

  private toggleMute() {
    this.setState(({ isMuted }) => ({
      isMuted: !isMuted,
    }), () => {
      Howler.mute(this.state.isMuted);
    });
  }
}

export default Player;
