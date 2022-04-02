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
        type="flex"
        align="middle"
        justify="space-between"
        style={{
          padding: '10px',
          background: '#222',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
      >
        <Col span={20}>Playing List</Col>
        <Col span={4} style={{ textAlign: 'right' }}>
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
        id="playing-list"
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
      <style jsx="true">{`
          #playing-list::-webkit-scrollbar {
            background-color: #222;
            width: 7px;
            border-radius: 10px;
          }
          #playing-list::-webkit-scrollbar-thumb {
            background-color: #999;
            border-radius: 10px;
            /* width: 5px; */
          }
          #playing-list::-webkit-scrollbar-track {
            display: none;
            border-radius: 10px;
          }
          #playing-list::-webkit-scrollbar-track-piece {
            border-radius: 10px;
          }
          #playing-list li:hover {
            cursor: pointer;
            background-color: rgb(50, 50, 50);
          }
          #playing-list li.playing {
            background-color: rgb(60, 60, 60);
          }
        `}</style>
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