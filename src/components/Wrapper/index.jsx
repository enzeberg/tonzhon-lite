import { Row, Col } from 'antd';

import neteaseMusicLogo from './images/netease_32.ico';
import qqMusicLogo from './images/qq_32.ico';
import kuwoMusicLogo from './images/kuwo_32.ico';

function Wrapper({ platform, buttons, children }) {
  const logo = logos[platform];
  return (
    <div
      className="white-card"
      style={{
        marginTop: '10px',
      }}
    >
      <Row align="middle" justify="space-between" style={{ marginBottom: '10px' }}>
        <Col>
          <img src={logo} alt={platform} />
        </Col>
        <Col style={{ textAlign: 'right' }}>
          {buttons}
        </Col>
      </Row>
      {children}
    </div>
  );
}

const logos = {
  netease: neteaseMusicLogo,
  qq: qqMusicLogo,
  kuwo: kuwoMusicLogo,
};

export default Wrapper;