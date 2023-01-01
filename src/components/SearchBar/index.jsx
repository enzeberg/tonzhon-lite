import { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';

const { Search } = Input;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    if (keyword && keyword !== this.props.keyword) {
      this.props.updateSearchKeyword(keyword);
      // this.props.history.push(`/search?keyword=${keyword}`);
    }
  }

  render() {
    return (
      <Search
        // defaultValue={keyword || ''}
        // value={keyword || ''}
        onSearch={this.onSearch}
        enterButton
        loading={this.props.searchStatus === 'searching'}
        style={{
          display: 'inline',
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    keyword: state.searchKeyword,
    searchStatus: state.searchStatus,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (keyword) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data: keyword });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);