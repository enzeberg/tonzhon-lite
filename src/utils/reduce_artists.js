function reduceArtists(artists) {
  return (
    artists.map(artist => artist.name)
      .reduce((accumulator, currentValue) =>
        accumulator + ', ' + currentValue
      )
  );
}

export default reduceArtists;