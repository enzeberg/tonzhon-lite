import React from 'react';

import { buildArtistLink } from '../utils/build_link';
import contentHandler from '../utils/content_handler';

function ArtistLinks({ platform, artists, color }) {
  return artists.map((artist) => (
    <a
      key={`${artist.id}`}
      href={buildArtistLink(platform, artist.id)}
      target="_blank"
      rel="noreferrer"
      title={contentHandler(artist.name, platform)}
      style={{
        color,
      }}
    >
      {contentHandler(artist.name, platform)}
      &nbsp;&nbsp;
    </a>
  ));
}

export default ArtistLinks;