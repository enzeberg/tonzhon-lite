import { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { connect } from 'react-redux';

class AddToPlayingList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addToPlayingList(this.props.song);
    message.success('Added.');
  }

  render() {
    return (
      <Button
        icon={<PlusOutlined />}
        size="small"
        onClick={this.handleClick}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToPlayingList: (data) => {
      dispatch({ type: 'ADD_SONG_TO_PLAYING_LIST', data });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddToPlayingList);