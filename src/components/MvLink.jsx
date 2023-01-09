import { Tag } from 'antd';

function buildMvLink(platform, id) {
  const qq = 'https://y.qq.com/n/ryqq/';
  const netease = 'https://music.163.com/#/';
  const kuwo = 'https://kuwo.cn/';

  switch (platform) {
    case 'qq':
      return `${qq}mv/${id}`;
    case 'netease':
      return `${netease}mv?id=${id}`;
    case 'kuwo':
      return `${kuwo}mvplay/${id}`;
    default:
      return;
  }
}

function MvLink({ platform, id }) {
  return (
    <a
      href={buildMvLink(platform, id)}
      target="_blank"
      rel="noreferrer"
    >
      <Tag>MV</Tag>
    </a>
  );
};

export default MvLink;