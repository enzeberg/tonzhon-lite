import React from 'react';
import { buildArtistLink } from '../utils/build_link';

function ArtistLinks({ platform, artists, color }) {
  return artists.map((artist) => (
    <a
      key={`${artist.id}`}
      href={buildArtistLink(platform, artist.id)}
      target="_blank"
      rel="noreferrer"
      title={artist.name}
      style={{
        color,
      }}
    >
      {artist.name}
      &ensp;
    </a>
  ));
}

export default ArtistLinks;