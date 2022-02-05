import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CaretRightOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  LoadingOutlined,
  PauseOutlined,
  DownloadOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Row, Col, Slider, Button, Tooltip, message } from 'antd';
import {
  MdRepeat as LoopIcon,
  MdRepeatOne as SingleIcon,
  MdShuffle as ShuffleIcon
} from 'react-icons/md';
import { FiVolume2 as VolumeIcon, FiVolumeX as MuteIcon } from 'react-icons/fi';

import ArtistLinks from './ArtistLinks';
import MvIcon from './MvIcon';
import PlayingList from './PlayingList';
import toMinAndSec from '../utils/to_min_and_sec';
import { buildSongLink } from '../utils/link';

const playModeIcons = {
  loop: <LoopIcon className="player-icon" />,
  single: <SingleIcon className="player-icon" />,
  shuffle: <ShuffleIcon className="player-icon" />,
};

const playModes = ['loop', 'single', 'shuffle', ];
const modeExplanations = {
  loop: '循环',
  single: '单曲循环',
  shuffle: '随机',
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getSongSourceStatus: 'notYet',
      playStatus: 'pausing',
      playMode: localStorage.getItem('playMode') || 'loop',
      volume: localStorage.getItem('volume')
              ? Number(localStorage.getItem('volume')) : 0.6,
      songSource: null,
      muted: false,
      playProgress: 0,
      playingListVisible: false,
    };
    
    this.onCentralBtnClick = this.onCentralBtnClick.bind(this);
    this.onPlayProgressSliderChange = this.onPlayProgressSliderChange.bind(this);
    this.onVolumeBtnClick = this.onVolumeBtnClick.bind(this);
    this.onVolumeSliderChange = this.onVolumeSliderChange.bind(this);
    this.onPlayModeBtnClick = this.onPlayModeBtnClick.bind(this);
    this.onPlayingListBtnClick = this.onPlayingListBtnClick.bind(this);
  }

  componentDidMount() {
    this.audio.volume = this.state.volume;
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        songLoaded: true,
        songDuration: this.audio.duration,
        // playProgress: 0
      });
    });
    this.audio.addEventListener('play', () => {
      document.title = `${this.props.currentSong.name} -
                        ${this.props.currentSong.artists
                        .map(item => item.name)
                        .reduce(
                          (accumulator, currentValue) =>
                            accumulator + ' / ' + currentValue
                        )}`;
      if (this.interval) { clearInterval(this.interval); }
      this.interval = setInterval(() => {
        this.setState({
          playProgress: this.audio.currentTime,
          // songDuration: this.audio.duration,
        });
      }, 1000);
    });
    this.audio.addEventListener('pause', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
    });
    this.audio.addEventListener('ended', () => {
      clearInterval(this.interval);
      this.setState({
        playProgress: this.audio.currentTime,
      }, () => {
        this.playNext('forward');
      });
    });
  }

  componentDidUpdate(prevProps) {
    const prevSong = prevProps.currentSong;
    const currentSong = this.props.currentSong;

    if (currentSong) {
      if ((prevSong && currentSong.newId !== prevSong.newId)
          || !prevSong) {
        this.audio.pause();
        this.setState({
          songSource: null,
          songLoaded: false,
          playProgress: 0,
        });
        this.getSongSourceAndPlay(currentSong);
      }
    } else {
      if (prevSong) {
        this.setState({
          songSource: null,
          songLoaded: false,
          playProgress: 0,
        });
      }
    }
  }

  onCentralBtnClick() {
    const { playStatus } = this.state;
    if (playStatus === 'pausing') {
      if (this.state.songSource) {
        this.play();
      } else {
        const { currentSong } = this.props;
        this.getSongSourceAndPlay(currentSong);
      }
    } else if (playStatus === 'playing') {
      this.pause();
    }
  }

  getSongSourceAndPlay(song) {
    this.getSongSource(song.platform, song.originalId, () => {
      this.play();
    });
  }

  play() {
    this.audio.play();
    this.setState({
      playStatus: 'playing',
    });
  }
  
  pause() {
    this.audio.pause();
    this.setState({
      playStatus: 'pausing',
    });
  }

  getSongSource(platform, originalId, callback) {
    this.setState({
      getSongSourceStatus: 'started',
    });
    fetch(`/api/song_source/${platform}/${originalId}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          this.setState({
            getSongSourceStatus: 'ok',
            songSource: json.data.songSource,
            songLoaded: false,
          }, callback);
        } else {
          this.setState({
            getSongSourceStatus: 'failed',
          }, () => {
            this.afterLoadingFailure();
          });
        }
      })
      .catch(err => {
        this.setState({
          getSongSourceStatus: 'failed',
        }, () => {
          this.afterLoadingFailure();
        });
      });
  }

  afterLoadingFailure() {
    message.error('加载失败');
    this.playNext('forward');
    message.info('已跳过');
  }

  onPlayProgressSliderChange(value) {
    this.audio.currentTime = value;
    this.setState({ playProgress: value });
  }

  onVolumeBtnClick() {
    if (this.state.muted) {
      this.audio.muted = false;
      this.setState({ muted: false });
    } else {
      this.audio.muted = true;
      this.setState({ muted: true });
    }
  }

  onVolumeSliderChange(value) {
    this.audio.volume = value;
    this.setState({ volume: value });
    localStorage.setItem('volume', value);
  }

  playNext(direction) {
    if (this.state.playStatus === 'playing') {
      this.pause();
    }
    const { currentSong, playingList } = this.props;
    const { playMode } = this.state;
    if (playMode === 'single' || playingList.length === 1) {
      this.audio.currentTime = 0;
      this.play();
    } else {
      this.props.changePlayIndex(currentSong, playingList, playMode, direction);
    }
  }

  onPlayModeBtnClick() {
    const i = playModes.indexOf(this.state.playMode);
    const mode = playModes[i + 1] || playModes[0];
    localStorage.setItem('playMode', mode);
    this.setState({
      playMode: mode,
    });
  }

  onPlayingListBtnClick() {
    this.setState({
      playingListVisible: !this.state.playingListVisible,
    });
  }

  render() {
    const { currentSong } = this.props;
    const { getSongSourceStatus, playStatus } = this.state;
    const progress = toMinAndSec(this.state.playProgress);
    const total = toMinAndSec(this.state.songDuration);
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          padding: '8px 0',
          width: '100%',
          backgroundColor: '#222',
          color: 'white',
        }}
      >
        <audio src={this.state.songSource}
          ref={(audio) => { this.audio = audio; }}
        />

        <Row type="flex" align="middle" className="container" justify="space-around">
          <Col span={4}>
            <Button ghost
              shape="circle"
              icon={<StepBackwardOutlined />}
              onClick={() => this.playNext('backward')}
            />
            <Button ghost
              shape="circle"
              size="large"
              disabled={!currentSong}
              onClick={this.onCentralBtnClick}
              icon={
                getSongSourceStatus === 'notYet' ? <CaretRightOutlined />
                  : (
                    getSongSourceStatus === 'started' ? <LoadingOutlined />
                      : (
                        getSongSourceStatus === 'ok'
                          ? (
                            playStatus === 'playing'
                              ? <PauseOutlined />
                              : <CaretRightOutlined />
                          )
                          : <CaretRightOutlined />
                      )
                  )
              }
              style={{ margin: '0 10px' }}
            />
            <Button ghost
              shape="circle"
              icon={<StepForwardOutlined />}
              onClick={() => this.playNext('forward')}
            />
          </Col>
          <Col span={14} style={{ paddingRight: 40 }}>
            <Row type="flex" align="middle" justify="space-between"
              style={{ height: 20 }}
            >
              {
                currentSong &&
                  <>
                    <Col span={7} className="nowrap">
                      <a
                        href={
                          buildSongLink(currentSong.platform, currentSong.originalId)
                        }
                        target="_blank"
                        rel="noreferrer"
                        title={currentSong.name}
                        style={{
                          color: 'white',
                          marginRight: 4,
                          fontSize: 16,
                        }}
                      >
                        <strong>{currentSong.name}</strong>
                      </a>
                    </Col>
                    <Col span={2}>
                      {
                        currentSong.mv &&
                        <MvIcon
                          platform={currentSong.platform}
                          id={currentSong.mv}
                          color="white"
                        />
                      }
                    </Col>
                    <Col span={6} className="nowrap">
                      {
                        currentSong.artists &&
                        <ArtistLinks artists={currentSong.artists}
                          platform={currentSong.platform}
                          fontColor="white"
                        />
                      }
                    </Col>
                    <Col span={5}
                      className="gray-in-player"
                      style={{
                        fontSize: 'small',
                        fontWeight: 'lighter',
                      }}
                    >
                      {`来自${platforms[currentSong.platform]}`}
                    </Col>
                    <Col span={4} className="gray-in-player" style={{ textAlign: 'right' }}>
                      {
                        getSongSourceStatus === 'started'
                        ? <LoadingOutlined />
                        : (
                          getSongSourceStatus === 'failed' ? '加载失败' :
                            // (
                            //   this.state.songLoaded ? `${progress} / ${total}`
                            //   : '00:00 / 00:00'
                            // )
                            (
                              this.state.songLoaded &&
                              <>
                                <span>{progress}</span>
                                <span> / {total}</span>
                              </>
                            )
                        )
                      }
                    </Col>
                  </>
              }
            </Row>
            <Slider
              min={0}
              max={
                this.state.songDuration ? parseInt(this.state.songDuration) : 0
              }
              value={this.state.playProgress}
              tipFormatter={(value) => toMinAndSec(value)}
              onChange={this.onPlayProgressSliderChange}
              disabled={!this.state.songSource}
              style={{ margin: '8px 0' }}
            />
          </Col>
          <Col span={1}>
            <Button
              icon={<DownloadOutlined />}
              ghost
              shape="circle"
              href={this.state.songSource}
              target="_blank"
              download
              disabled={this.state.songSource === null}
            />
          </Col>
          <Col span={1} style={{ paddingLeft: 3 }}>
            <Tooltip
              title={modeExplanations[this.state.playMode]}
            >
              <a onClick={this.onPlayModeBtnClick}>
                {
                  playModeIcons[this.state.playMode]
                }
              </a>
            </Tooltip>
          </Col>
          <Col span={3}>
            <Row type="flex" align="middle">
              <Col span={4}>
                <a onClick={this.onVolumeBtnClick}>
                  {
                    this.state.muted
                      ? <MuteIcon className="player-icon" />
                      : <VolumeIcon className="player-icon" />
                  }
                </a>
              </Col>
              <Col span={20}>
                <Slider min={0}
                  max={1}
                  step={0.01}
                  defaultValue={this.state.volume}
                  onChange={this.onVolumeSliderChange}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1} style={{ textAlign: 'right' }}>
            <Button ghost icon={<UnorderedListOutlined />}
              onClick={this.onPlayingListBtnClick}
              title="播放列表"
            />
          </Col>
        </Row>
        {
          this.state.playingListVisible && <PlayingList />
        }
      </div>
    );
  }
}

const platforms = {
  qq: 'QQ音乐',
  netease: '网易云音乐',
  kuwo: '酷我音乐',
};

function mapStateToProps(state) {
  const currentSong = state.playingList[state.playIndex];
  return {
    currentSong: currentSong,
    playingList: state.playingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changePlayIndex: (currentSong, playingList, playMode, direction) => {
      let nextPlayIndex;
      const currentIndex = playingList.findIndex(song =>
        song.newId === currentSong.newId);
      if (playMode === 'loop') {
        if (direction === 'forward') {
          nextPlayIndex = playingList[currentIndex + 1] ? currentIndex + 1 : 0;
        } else if (direction === 'backward') {
          nextPlayIndex = playingList[currentIndex - 1] ? currentIndex - 1 :
            playingList.length - 1;
        }
      } else if (playMode === 'shuffle') {
        do {
          nextPlayIndex = Math.floor(Math.random() * playingList.length);
        } while (nextPlayIndex === currentIndex);
      }
      if (nextPlayIndex !== undefined) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: nextPlayIndex });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);