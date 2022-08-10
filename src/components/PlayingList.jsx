import { DeleteOutlined } from '@ant-design/icons';
import { Button, List, Row, Col } from 'antd';
import { connect } from 'react-redux';

import ItemInPlayingList from './SongItem/in_playing_list';

function PlayingList({ dataSource, clearPlayingList }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '64px',
        right: `${(document.body.clientWidth - 1000) / 2}px`,
        width: '600px',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        background: 'rgb(70,70,70)',
      }}
    >
      <Row
        align="middle"
        justify="space-between"
        style={{
          padding: '10px',
          background: '#222',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
      >
        <Col>Playing List</Col>
        <Col>
          <Button
            ghost
            icon={<DeleteOutlined />}
            onClick={clearPlayingList}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={song => (
          <ItemInPlayingList song={song} />
        )}
        style={{
          color: 'white',
          overflow: 'auto',
          height: '280px',
        }}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dataSource: state.playingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    clearPlayingList: () => {
      dispatch({ type: 'CLEAR_PLAYING_LIST' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingList);