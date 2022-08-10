import { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import SongList from './SongList';
import Wrapper from './Wrapper';
import ButtonsForSongs from './ButtonsForSongs';

class Result extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(page) {
    const { keyword, platform, onResultResponded } = this.props;
    fetch(`/api/search?keyword=${keyword}&platform=${platform}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        const { success, data } = json;
        if (success && data.total > 0) {
          onResultResponded(platform, data);
        }
      })
      .catch(err => {
        console.log('err ', err);
      });
  }

  render() {
    const { platform, data } = this.props;
    const { songs, total } = data;

    return (
      <Wrapper
        platform={platform}
        buttons={
          <ButtonsForSongs songs={songs} />
        }
        pagination={
          <Pagination
            simple
            onChange={this.onPageChange}
            defaultPageSize={8}
            total={total}
          />
        }
      >
        <SongList songs={songs} />
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
      dispatch({ type: 'UPDATE_SEARCH_RESULT', platform, data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);