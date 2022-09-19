import { DeleteOutlined } from '@ant-design/icons';
import { Button, List, Row, Col } from 'antd';
import { connect } from 'react-redux';

import ItemInPlayingList from './SongItem/in_playing_list';

function PlayingList({ dataSource, clearPlayingList }) {
  return (
    <div
      id="playing-list"
      style={{
        right: `${(document.body.clientWidth - 1000) / 2}px`,
      }}
    >
      <Row
        id="playing-list-header"
        align="middle"
        justify="space-between"
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
        id="playing-list-content"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={song => (
          <ItemInPlayingList song={song} />
        )}
        
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