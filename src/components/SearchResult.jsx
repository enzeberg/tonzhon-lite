import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import SongList from './SongList';
import Wrapper from './Wrapper';
import OperatingBarOfSongList from './OperatingBarOfSongList';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(page) {
    const { platform, keyword, onResultResponded } = this.props;
    fetch(`/api/search?keyword=${keyword}&platform=${platform}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        onResultResponded(platform, json);
      })
      .catch(err => {
        console.log('err ', err);
      });
  }

  render() {
    const { result, platform } = this.props;

    return (
      <Wrapper
        platform={platform}
        operatingBar={
          <OperatingBarOfSongList songs={result.data.songs} />
        }
        pagination={
          <Pagination
            simple
            onChange={this.onPageChange}
            defaultPageSize={4}
            total={result.data.totalCount}
          />
        }
      >
        <SongList songs={result.data.songs} />
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    keyword: state.searchKeyword,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onResultResponded: (platform, data) => {
      dispatch({ type: 'UPDATE_SEARCH_RESULTS', platform, data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);