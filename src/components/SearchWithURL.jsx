import { Component } from 'react';
import { connect } from 'react-redux';

class SearchWithURL extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { location } = this.props;
    const keyword = (new URLSearchParams(location.search)).get('keyword');
    if (keyword) {
      this.props.updateSearchKeyword(keyword);
    }
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (data) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data });
    },
  };
}

export default connect(null, mapDispatchToProps)(SearchWithURL);