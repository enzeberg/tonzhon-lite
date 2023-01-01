import { Component } from 'react';
import { Row, Col, List, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import kuwoMusicLogo from './images/kuwo_16.ico';
import MvLink from '../MvLink';
import AddToPlayingList from './AddToPlayingList';
import reduceArtists from '../../utils/reduce_artists';

class SongItem extends Component {
  constructor(props) {
    super(props);
    this.onPlayBtnClick = this.onPlayBtnClick.bind(this);
  }

  onPlayBtnClick() {
    const { playingList, song } = this.props;
    const index = playingList.findIndex(item => item.newId === song.newId);
    if (index === -1) {
      this.props.addToPlayingList(song);
      this.props.updatePlayIndex(playingList.length);
    } else {
      this.props.updatePlayIndex(index);
    }
  }

  render() {
    const { song } = this.props;
    const { platform, name, alias, mv, artists, album } = song;
    return (
      <List.Item className="song-item">
        <Row
          align="middle"
          style={{
            width: '100%',
            fontSize: 14,
          }}
        >
          <Col span={8} className="ellipsis">
            <span>{name}</span>
            {
              alias &&
              <span className="song-alias">
                {alias}
              </span>
            }
          </Col>
          <Col span={1}>
            {mv && <MvLink platform={platform} id={mv} />}
          </Col>
          <Col span={6} className="ellipsis">
            {
              reduceArtists(artists)
            }
          </Col>
          <Col span={6} className="ellipsis">
            {album.name}
          </Col>
          <Col span={1}>
            {
              this.props.showPlatform &&
              <img
                src={logos[platform]}
                alt={platform}
                style={{ display: 'block' }}
              />
            }
          </Col>
          <Col
            span={2}
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              icon={<CaretRightOutlined />}
              shape="circle"
              size="small"
              onClick={this.onPlayBtnClick}
              style={{
                marginRight: '8px',
              }}
            />
            <AddToPlayingList song={song} />
          </Col>
        </Row>
      </List.Item>
    );
  }
}

const logos = {
  qq: qqMusicLogo,
  netease: neteaseMusicLogo,
  kuwo: kuwoMusicLogo,
};

function mapStateToProps(state) {
  return {
    currentSong: state.playingList[state.playIndex],
    playingList: state.playingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlayingList: (song) => {
      dispatch({ type: 'ADD_SONG_TO_PLAYING_LIST', data: song });
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);