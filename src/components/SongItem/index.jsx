import React, { Component } from 'react';
import { Row, Col, List, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import kuwoMusicLogo from './images/kuwo_16.ico';
import ArtistLinks from '../ArtistLinks';
import MvIcon from '../MvIcon';
import AddToPlayingList from './AddToPlayingList';
import './index.css';
import { buildSongLink, buildAlbumLink } from '../../utils/build_link';
import contentHandler from '../../utils/content_handler';

class SongItem extends Component {
  constructor(props) {
    super(props);

    this.onPlayBtnClick = this.onPlayBtnClick.bind(this);
  }

  onPlayBtnClick() {
    const index = this.props.playingList.findIndex(song =>
      song.newId === this.props.song.newId);
    if (index === -1) {
      this.props.addToPlayingList(this.props.song);
      this.props.updatePlayIndex(this.props.playingList.length);
    } else {
      this.props.updatePlayIndex(index);
    }
  }

  render() {
    const { song, currentSong } = this.props;
    const { originalId, newId, platform, name, alias, mv, artists, album } = song;
    return (
      <List.Item style={{ padding: '4px 10px' }}>
        <Row type="flex" align="middle"
          style={{
            width: '100%',
            fontSize: 14,
          }}
        >
          <Col span={8} className="nowrap">
            <a
              href={buildSongLink(platform, originalId)}
              title={
                `${contentHandler(name, platform)}
                ${alias ? ` - ${contentHandler(alias, platform)}` : ''}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <span>{contentHandler(name, platform)}</span>
              <span style={{ color: '#999' }}>
                {alias && ` - ${contentHandler(alias, platform)}`}
              </span>
            </a>
          </Col>
          <Col span={1}>
            {mv && <MvIcon platform={platform} id={mv} />}
          </Col>
          <Col span={6} className="nowrap">
            <ArtistLinks platform={platform} artists={artists} />
          </Col>
          <Col span={6} className="nowrap">
            <a
              href={buildAlbumLink(platform, album.id)}
              target="_blank"
              rel="noreferrer"
              title={contentHandler(album.name, platform)}
            >
              {contentHandler(album.name, platform)}
            </a>
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
          <Col span={2}
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              icon={<CaretRightOutlined />}
              shape="circle"
              size="small"
              onClick={this.onPlayBtnClick}
              className={
                currentSong && currentSong.newId === newId
                  ? 'play-btn playing' : 'play-btn'
              }
              style={{
                marginRight: '8px',
              }}
            />
            <AddToPlayingList data={song} />
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