import { ConfigProvider, List } from 'antd';

import SongItem from './SongItem';

function SongList({ songs, showPlatform }) {
  return (
    <ConfigProvider
      theme={{
        "components": {
          "List": {
            "paddingContentVertical": 4,
            "paddingContentHorizontalLG": 10
          }
        },
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={songs}
        renderItem={song => (
          <SongItem
            song={song}
            showPlatform={showPlatform}
          />
        )}
      />
    </ConfigProvider>
  );
}

export default SongList;