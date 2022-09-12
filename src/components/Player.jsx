import { Component } from 'react';
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
import { Row, Col, Slider, Button, message } from 'antd';
import { FiVolume2 as VolumeIcon, FiVolumeX as MuteIcon } from 'react-icons/fi';

import ArtistLinks from './ArtistLinks';
import MvLink from './MvLink';
import PlayingList from './PlayingList';
import toMinAndSec from '../utils/to_min_and_sec';
import { buildSongLink } from '../utils/build_link';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatus: 'pausing',
      muted: false,
      volume: localStorage.getItem('volume')
              ? Number(localStorage.getItem('volume')) : 0.6,
      playingListVisible: false,
      getSongSourceStatus: 'notYet',
      songSource: null,
      songLoaded: false,
      playProgress: 0,
    };
    
    this.onCentralBtnClick = this.onCentralBtnClick.bind(this);
    this.onPlayProgressSliderChange = this.onPlayProgressSliderChange.bind(this);
    this.onVolumeBtnClick = this.onVolumeBtnClick.bind(this);
    this.onVolumeSliderChange = this.onVolumeSliderChange.bind(this);
    this.onPlayingListBtnClick = this.onPlayingListBtnClick.bind(this);
  }

  componentDidMount() {
    this.audio.volume = this.state.volume;
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        songLoaded: true,
        songDuration: this.audio.duration,
      });
    });

    this.audio.addEventListener('play', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        this.setState({
          playProgress: this.audio.currentTime,
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
      this.playNext('forward');
    });
  }

  componentDidUpdate(prevProps) {
    const prevSong = prevProps.currentSong;
    const currentSong = this.props.currentSong;

    if (currentSong) {
      if ((prevSong && currentSong.newId !== prevSong.newId) || !prevSong) {
        this.audio.pause();
        this.getSongSourceAndPlay(currentSong);
      }
    } else {
      if (prevSong) {
        this.setState({
          getSongSourceStatus: 'notYet',
          songSource: null,
          songLoaded: false,
          playProgress: 0,
        });
        this.pause();
      }
    }
  }

  onCentralBtnClick() {
    const { playerStatus } = this.state;
    if (playerStatus === 'pausing') {
      if (this.state.songSource) {
        this.play();
      } else {
        const { currentSong } = this.props;
        this.getSongSourceAndPlay(currentSong);
      }
    } else if (playerStatus === 'playing') {
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
      playerStatus: 'playing',
    });
  }
  
  pause() {
    this.audio.pause();
    this.setState({
      playerStatus: 'pausing',
    });
  }

  getSongSource(platform, originalId, callback) {
    this.setState({
      songSource: null,
      songLoaded: false,
      playProgress: 0,
      getSongSourceStatus: 'started',
    });
    fetch(`/api/song_source/${platform}/${originalId}`)
      .then(res => res.json())
      .then(json => {
        const { success, data } = json;
        if (success) {
          this.setState({
            getSongSourceStatus: 'ok',
            songSource: data.songSource,
          }, callback);
        } else {
          this.failedToGetSongSource();
        }
      })
      .catch(err => {
        this.failedToGetSongSource();
      });
  }

  failedToGetSongSource() {
    this.setState({
      getSongSourceStatus: 'failed',
    }, () => {
      message.error('Failed to get song source');
      // this.playNext('forward'); // Auto-skip is not safe.
      // message.info('Skipped');
    });
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
    if (this.state.playerStatus === 'playing') {
      this.pause();
    }
    const { currentSong, playingList } = this.props;
    this.props.changePlayIndex(currentSong, playingList, direction);
  }

  onPlayingListBtnClick() {
    this.setState({
      playingListVisible: !this.state.playingListVisible,
    });
  }

  render() {
    const { currentSong } = this.props;
    const {
      playerStatus,
      getSongSourceStatus,
      songSource,
      songLoaded,
      songDuration,
      playProgress
    } = this.state;
    const progress = toMinAndSec(playProgress);
    const total = toMinAndSec(songDuration);
    
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
        <audio
          src={songSource}
          ref={(audio) => { this.audio = audio; }}
        />

        <Row align="middle" className="container" justify="space-around">
          <Col span={4}>
            <Button
              ghost
              shape="circle"
              icon={<StepBackwardOutlined />}
              onClick={() => this.playNext('backward')}
            />
            <Button
              ghost
              shape="circle"
              size="large"
              disabled={!currentSong}
              onClick={this.onCentralBtnClick}
              icon={
                getSongSourceStatus === 'notYet'
                ? <CaretRightOutlined />
                : (
                  getSongSourceStatus === 'started'
                  ? <LoadingOutlined />
                  : (
                    getSongSourceStatus === 'ok'
                    ? (
                      songLoaded
                      ? (
                        playerStatus === 'playing'
                        ? <PauseOutlined />
                        : <CaretRightOutlined />
                      )
                      : <LoadingOutlined />
                    )
                    : <CaretRightOutlined />
                  )
                )
              }
              style={{ margin: '0 10px' }}
            />
            <Button
              ghost
              shape="circle"
              icon={<StepForwardOutlined />}
              onClick={() => this.playNext('forward')}
            />
          </Col>
          <Col span={14}>
            <Row
              align="middle"
              style={{ height: 20 }}
            >
              {
                currentSong &&
                  <>
                    <Col span={7} className="ellipsis">
                      <a
                        href={
                          buildSongLink(currentSong.platform, currentSong.originalId)
                        }
                        target="_blank"
                        rel="noreferrer"
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
                        <MvLink
                          platform={currentSong.platform}
                          id={currentSong.mv}
                          color="white"
                        />
                      }
                    </Col>
                    <Col span={6} className="ellipsis">
                      {
                        currentSong.artists &&
                        <ArtistLinks
                          artists={currentSong.artists}
                          platform={currentSong.platform}
                          color="white"
                        />
                      }
                    </Col>
                    <Col
                      span={5}
                      className="gray-in-player"
                      style={{
                        fontSize: 'small',
                        fontWeight: 'lighter',
                      }}
                    >
                      {`Provided by ${platforms[currentSong.platform]}`}
                    </Col>
                    <Col span={4} className="gray-in-player" style={{ textAlign: 'right' }}>
                      {
                        songLoaded
                        ? (
                          <>
                            <span>{progress}</span>
                            <span> / {total}</span>
                          </>
                        )
                        : (
                          getSongSourceStatus === 'started'
                          ? <LoadingOutlined />
                          : (
                            getSongSourceStatus === 'ok'
                            ? <LoadingOutlined />
                            : (
                              getSongSourceStatus === 'failed' && 'No source'
                            )
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
                songDuration ? parseInt(songDuration) : 0
              }
              value={playProgress}
              tipFormatter={(value) => toMinAndSec(value)}
              onChange={this.onPlayProgressSliderChange}
              disabled={!songSource}
              style={{ margin: '8px 0' }}
            />
          </Col>
          <Col span={2} style={{ paddingLeft: 30 }}>
            <Button
              ghost
              icon={<DownloadOutlined />}
              shape="circle"
              href={songSource}
              target="_blank"
              download
              disabled={songSource === null}
            />
          </Col>
          <Col span={3}>
            <Row align="middle">
              <Col span={4}>
                <button
                  className="in-player"
                  onClick={this.onVolumeBtnClick}
                >
                  {
                    this.state.muted
                    ? <MuteIcon className="icon-in-player" />
                    : <VolumeIcon className="icon-in-player" />
                  }
                </button>
              </Col>
              <Col span={20}>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  defaultValue={this.state.volume}
                  onChange={this.onVolumeSliderChange}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1} style={{ textAlign: 'right' }}>
            <Button
              ghost
              icon={<UnorderedListOutlined />}
              onClick={this.onPlayingListBtnClick}
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
  qq: 'QQ',
  netease: 'NetEase',
  kuwo: 'Kuwo',
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
    changePlayIndex: (currentSong, playingList, direction) => {
      let nextPlayIndex;
      const currentIndex = playingList.findIndex(song =>
        song.newId === currentSong.newId);
      if (direction === 'forward') {
        nextPlayIndex = playingList[currentIndex + 1] ? currentIndex + 1 : undefined;
      } else if (direction === 'backward') {
        nextPlayIndex = playingList[currentIndex - 1] ? currentIndex - 1 : undefined;
      }
      if (nextPlayIndex !== undefined) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: nextPlayIndex });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);