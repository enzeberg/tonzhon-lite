import React, { Fragment } from 'react';

function Artists({ artists }) {
  return artists.map((artist, index) => {
    return (
      <Fragment key={artist.id}>
        {artist.name}
        &ensp;
      </Fragment>
    );
  });
}

export default Artists;