import { Component } from 'react';
import { Row, Col, List, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import Artists from '../Artists';
import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import kuwoMusicLogo from './images/kuwo_16.ico';

class SongItem extends Component {
  constructor(props) {
    super(props);

    this.onRowClick = this.onRowClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
  }

  onRowClick() {
    const index = this.props.playingList.findIndex(item =>
                  item.newId === this.props.song.newId);
    this.props.updatePlayIndex(index);
  }

  onDeleteBtnClick() {
    const { playingList, song, currentSong, playIndex } = this.props;
    const index = playingList.findIndex(item => item.newId === song.newId);
    if (currentSong.newId === song.newId && index + 1 === playingList.length) {
      this.props.updatePlayIndex(0);
    }
    this.props.deleteSongInPlayingList(index, playIndex);
  }

  render() {
    const { song, currentSong } = this.props;
    const { name, artists, platform } = song;
    return (
      <List.Item
        className={
          currentSong && currentSong.newId === song.newId
          ? 'item-in-playing-list playing' : 'item-in-playing-list'
        }
        extra={
          <Button
            onClick={this.onDeleteBtnClick}
            icon={<DeleteOutlined />}
            size="small"
            ghost
          />
        }
        style={{
          border: 'none',
          padding: '0 10px 0 0',
        }}
      >
        <Row
          align="middle"
          onClick={this.onRowClick}
          style={{
            width: '100%',
            color: 'white',
            padding: '5px 10px',
          }}
        >
          <Col span={12} className="nowrap">
            {name}
          </Col>
          <Col span={10} className="nowrap">
            <Artists artists={artists} platform={platform} />
          </Col>
          <Col span={2}>
            <img src={logos[platform]} alt={platform} />
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