import { Component } from 'react';
import { Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import AddListToPlayingList from './AddListToPlayingList';

class TopButtons extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <Button
          icon={<CaretRightOutlined />}
          onClick={() => this.props.playSongList(this.props.songs)}
          style={{
            marginRight: '10px',
          }}
        >
          播放
        </Button>
        <AddListToPlayingList list={this.props.songs} />
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playSongList: (songs) => {
      dispatch({ type: 'NEW_PLAYING_LIST', data: songs });
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: 0 });
    },
  };
}

export default connect(null, mapDispatchToProps)(TopButtons);