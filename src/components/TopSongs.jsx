import React, { Component } from 'react';
import { connect } from 'react-redux';

import SongList from './SongList';

class TopSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSongs: []
    };
  }

  componentDidUpdate(prevProps) {
    const currentResults = this.props.searchResults;
    if (currentResults !== prevProps.searchResults) {
      // changing search keyword will cause 'CLEAR_RESULTS', which means the 
      // topSongs should be cleared too.
      if (Object.keys(currentResults).length === 0) {
        this.setState({
          topSongs: []
        });
      }
      Object.keys(currentResults).forEach((key) => {
        if (this.state.topSongs.every((song) => song.platform !== key)) {
          if (currentResults[key].searchSuccess) {
            this.setState({
              topSongs: [
                ...this.state.topSongs,
                currentResults[key].data.songs[0]
              ]
            });
          }
        }
      });
    }
  }

  render() {
    const { topSongs } = this.state;
    return (
      topSongs.length > 0
      ? (
        <div className="white-card">
          <SongList songs={topSongs} showPlatform />
        </div>
      )
      : null
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults
  };
}

export default connect(mapStateToProps)(TopSongs);