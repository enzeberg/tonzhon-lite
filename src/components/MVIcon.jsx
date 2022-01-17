import React from 'react';
import { MdOndemandVideo } from 'react-icons/md';

import { buildMvLink } from '../utils/link';

function MVIcon({ platform, id, color }) {
  return (
    <a
      href={buildMvLink(platform, id)}
      target="_blank"
      rel="noreferrer"
      title="MV"
    >
      <MdOndemandVideo
        style={{
          display: 'block',
          fontSize: 20,
          color: color || 'black',
        }}
      />
    </a>
  );
};

export default MVIcon;