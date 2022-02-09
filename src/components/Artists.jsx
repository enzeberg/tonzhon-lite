import React, { Fragment } from 'react';

import contentHandler from '../utils/content_handler';

function Artists({ artists, platform }) {
  return artists.map((artist) => (
    <Fragment key={artist.id}>
      {contentHandler(artist.name, platform)}
      &nbsp;&nbsp;
    </Fragment>
  ));
}

export default Artists;