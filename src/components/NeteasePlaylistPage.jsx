import { useState } from 'react';
import { Layout, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import PlaylistContainer from './PlaylistContainer';

const { Sider, Content } = Layout;
const { Search } = Input;

function NeteasePlaylistPage() {
  const [playlistId, setPlaylistId] = useState('6774517990');
  
  const onSearch = (value) => {
    setPlaylistId(value);
  };

  return (
    <Layout
      style={{
        background: 'white',
        padding: '15px',
        minHeight: '1000px',
      }}
    >
      <Sider style={{ background: 'none', marginRight: 20 }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '22px' }}>Netease Playlist</span>
        </div>
        <Search
          enterButton={<RightOutlined />}
          onSearch={onSearch}
          placeholder="Playlist ID"
        />
      </Sider>
      <Content style={{ background: 'none', }}>
        <PlaylistContainer playlistId={playlistId} />
      </Content>
    </Layout>
  );
}

export default NeteasePlaylistPage;