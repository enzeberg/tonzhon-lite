import React from 'react';
import { List } from 'antd';

import SongItem from './SongItem';

function SongList({ songs, showPlatform }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={songs}
      renderItem={song => {
        return (
          <SongItem key={song.link}
            song={song}
            showPlatform={showPlatform}
          />
        );
      }}
      className="song-list"
    />
  );
}

export default SongList;