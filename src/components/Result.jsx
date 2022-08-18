import { Component } from 'react';
import { connect } from 'react-redux';

import SongList from './SongList';
import Wrapper from './Wrapper';
import ButtonsForSongs from './ButtonsForSongs';

class Result extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { platform, data } = this.props;
    const { songs } = data;

    return (
      <Wrapper
        platform={platform}
        buttons={
          <ButtonsForSongs songs={songs} />
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