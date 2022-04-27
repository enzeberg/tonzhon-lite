import { Component } from 'react';
import { Row, Col, List, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import kuwoMusicLogo from './images/kuwo_16.ico';
import ArtistLinks from '../ArtistLinks';
import MvLink from '../MvLink';
import AddToPlayingList from './AddToPlayingList';
import { buildSongLink, buildAlbumLink } from '../../utils/build_link';
import './index.css';

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
    const { song, currentSong } = this.props;
    const { originalId, newId, platform, name, alias, mv, artists, album } = song;
    return (
      <List.Item style={{ padding: '4px 10px' }}>
        <Row
          align="middle"
          style={{
            width: '100%',
            fontSize: 14,
          }}
        >
          <Col span={8} className="nowrap">
            <a
              href={buildSongLink(platform, originalId)}
              title={
                `${name}${alias ? ` - ${alias}` : ''}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <span>{name}</span>
              <span style={{ color: '#999' }}>
                {alias && ` - ${alias}`}
              </span>
            </a>
          </Col>
          <Col span={1}>
            {mv && <MvLink platform={platform} id={mv} />}
          </Col>
          <Col span={6} className="nowrap">
            <ArtistLinks platform={platform} artists={artists} />
          </Col>
          <Col span={6} className="nowrap">
            <a
              href={buildAlbumLink(platform, album.id)}
              target="_blank"
              rel="noreferrer"
              title={album.name}
            >
              {album.name}
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
              className={
                currentSong && currentSong.newId === newId
                ? 'play-btn playing'
                : 'play-btn'
              }
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