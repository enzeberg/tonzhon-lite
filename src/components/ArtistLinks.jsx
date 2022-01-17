import React from 'react';
import { buildArtistLink } from '../utils/link';

function ArtistLinks({ platform, artists, fontColor }) {
  return artists.map((artist, index) => {
    return (
      <a
        key={`${artist.id}`}
        href={buildArtistLink(platform, artist.id)}
        target="_blank"
        rel="noreferrer"
        title={artist.name}
        style={{ color: fontColor }}
      >
        {artist.name}
        &ensp;
      </a>
    );
  });
}

export default ArtistLinks;