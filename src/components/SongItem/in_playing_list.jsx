import React, { Component } from 'react';
import { Row, Col, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import Artists from '../Artists';
import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import kuwoMusicLogo from './images/kuwo_16.ico';

class SongItem extends Component {
  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
  }

  onListItemClick() {
    const index = this.props.playingList.findIndex(song =>
      song.newId === this.props.song.newId);
    if (index === -1) {
      this.props.addToPlayingList(this.props.song);
      this.props.updatePlayIndex(this.props.playingList.length);
    } else {
      this.props.updatePlayIndex(index);
    }
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();
    const index = this.props.playingList.findIndex(song =>
                  song.newId === this.props.song.newId);
    if (index + 1 === this.props.playingList.length) {
      this.props.updatePlayIndex(0);
    }
    this.props.deleteSongInPlayingList(index, this.props.playIndex);
  }

  render() {
    let { song, currentSong } = this.props;
    return (
      <List.Item
        onClick={this.onListItemClick}
        className={currentSong && currentSong.newId === song.newId ?
          'playing' : ''
        }
        style={{ border: 'none', padding: '6px 10px' }}
        extra={
          <DeleteOutlined
            style={{
              fontSize: 18,
              verticalAlign: 'middle',
              color: 'white',
            }}
            onClick={this.onDeleteBtnClick}
          />
        }
      >
        <Row type="flex" align="middle"
          style={{ width: '100%', color: 'white', }}
        >
          <Col span={12} className="nowrap">
            {song.name}
          </Col>
          <Col span={10} className="nowrap">
            <Artists artists={song.artists} />
          </Col>
          <Col span={2}>
            <img src={logos[song.platform]} alt={song.platform} />
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
    playIndex: state.playIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    },
    deleteSongInPlayingList: (indexToDelete, playIndex) => {
      dispatch({ type: 'DELETE_SONG_IN_PLAYING_LIST', data: indexToDelete });
      if (indexToDelete < playIndex) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: playIndex - 1 });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);