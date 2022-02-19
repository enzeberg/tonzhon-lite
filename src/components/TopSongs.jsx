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
    const { searchResults } = this.props;
    if (searchResults !== prevProps.searchResults) {
      const platforms = Object.keys(searchResults);
      if (platforms.length === 0) {
        this.setState({
          topSongs: []
        });
      } else {
        const prevPlatforms = Object.keys(prevProps.searchResults);
        // don't update TopSongs when switch page in Result.
        if (platforms.length > prevPlatforms.length) {
          platforms.forEach((platform) => {
            this.setState({
              topSongs: [
                ...this.state.topSongs,
                searchResults[platform].songs[0]
              ]
            });
          });
        }
      }
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