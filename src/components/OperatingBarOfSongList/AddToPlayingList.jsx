import React, { Component } from 'react';
import { message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

class AddToPlayingList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleClick = () => {
    this.props.addToPlaylist(this.props.data);
    message.success('已添加到播放列表');
  }

  render() {
    return (
      <Button icon={<PlusOutlined />}
        onClick={this.handleClick}
      >
        添加到播放列表
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (data) => {
      dispatch({ type: 'ADD_LIST_TO_PLAYING_LIST', data: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddToPlayingList);