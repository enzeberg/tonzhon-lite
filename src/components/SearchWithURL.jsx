import { Component } from 'react';
import { connect } from 'react-redux';

class SearchWithURL extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { location, keywordFromStore } = this.props;
    const keyword = location.search.split('=')[1]; // encoded
    if (keyword && keyword !== keywordFromStore) {
      this.props.updateSearchKeyword(window.decodeURIComponent(keyword));
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    keywordFromStore: state.searchKeyword, // encoded
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (data) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithURL);