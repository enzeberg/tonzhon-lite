const qq = 'https://y.qq.com/n/ryqq/';
const netease = 'https://music.163.com/#/';
const kuwo = 'https://kuwo.cn/';

function buildSongLink(platform, id) {
  switch(platform) {
    case 'qq':
      return `${qq}songDetail/${id}`;
    case 'netease':
      return `${netease}song?id=${id}`;
    case 'kuwo':
      return `${kuwo}play_detail/${id}`;
    default:
      return;
  }
}

function buildMvLink(platform, id) {
  switch (platform) {
    case 'qq':
      return `${qq}mv/${id}`;
    case 'netease':
      return `${netease}mv?id=${id}`;
    default:
      return;
  }
}

function buildArtistLink(platform, id) {
  switch (platform) {
    case 'qq':
      return `${qq}singer/${id}`;
    case 'netease':
      return `${netease}artist?id=${id}`;
    case 'kuwo':
      return `${kuwo}singer_detail/${id}`;
    default:
      return;
  }
}

function buildAlbumLink(platform, id) {
  switch (platform) {
    case 'qq':
      return `${qq}albumDetail/${id}`;
    case 'netease':
      return `${netease}album?id=${id}`;
    case 'kuwo':
      return `${kuwo}album_detail/${id}`;
    default:
      return;
  }
}

export {
  buildSongLink,
  buildMvLink,
  buildArtistLink,
  buildAlbumLink,
};