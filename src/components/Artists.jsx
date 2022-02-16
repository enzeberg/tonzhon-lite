import React, { Fragment } from 'react';

function Artists({ artists, platform }) {
  return artists.map((artist) => (
    <Fragment key={artist.id}>
      {artist.name}
      &nbsp;&nbsp;
    </Fragment>
  ));
}

export default Artists;