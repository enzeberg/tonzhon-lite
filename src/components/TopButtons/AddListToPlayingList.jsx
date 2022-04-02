import { Component } from 'react';
import { message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

class AddListToPlayingList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addListToPlayingList(this.props.list);
    message.success('Added.');
  }

  render() {
    return (
      <Button
        icon={<PlusOutlined />}
        onClick={this.handleClick}
      >
        Add to Playing List
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addListToPlayingList: (data) => {
      dispatch({ type: 'ADD_LIST_TO_PLAYING_LIST', data });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddListToPlayingList);