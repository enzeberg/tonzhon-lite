import { Fragment } from 'react';

function Artists({ artists }) {
  return artists.map((artist) => (
    <Fragment key={artist.id}>
      {artist.name}
      &nbsp;&nbsp;
    </Fragment>
  ));
}

export default Artists;