import React, { Fragment } from 'react';

function Artists({ artists }) {
  return artists.map((artist) => (
    <Fragment key={artist.id}>
      {artist.name}
      &ensp;
    </Fragment>
  ));
}

export default Artists;