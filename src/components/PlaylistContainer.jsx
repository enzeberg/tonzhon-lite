import { Component } from 'react';
import { Row, Col, Spin } from 'antd';

import SongList from './SongList';
import TopButtons from './TopButtons';

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playlistName: '',
      songs: [],
    };
  }

  componentDidMount() {
    this.fetchPlaylist(this.props.playlistId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playlistId !== this.props.playlistId) {
      this.fetchPlaylist(this.props.playlistId);
    }
  }

  fetchPlaylist(playlistId) {
    this.setState({
      loading: true,
      playlistName: '',
      songs: [],
    });
    fetch(`/api/netease-playlist/${playlistId}`, {
      credentials: 'include',
    }).then(res => res.json())
      .then(json => {
        this.setState({
          loading: false,
        });
        const { success, data } = json;
        if (success) {
          this.setState({
            playlistName: data.name,
            songs: data.songs,
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { playlistName, songs, loading } = this.state;
    return (
      <>
        <Row
          type="flex"
          align="middle"
          justify="space-between"
          style={{ marginBottom: '10px' }}
        >
          <Col span={16} style={{ fontSize: '20px' }}>
            {playlistName}
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            {
              songs.length > 0 &&
              <TopButtons songs={songs} />
            }
          </Col>
        </Row>
        {
          loading
          ? <Spin />
          : (
            songs.length > 0
            ? <SongList songs={songs} />
            : 'Failed to load.'
          )
        }
      </>
    );
  }
}

export default PlaylistContainer;