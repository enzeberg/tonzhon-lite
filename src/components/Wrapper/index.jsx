import React from 'react';
import { Row, Col } from 'antd';

import neteaseMusicLogo from './images/netease_32.ico';
import qqMusicLogo from './images/qq_32.ico';
import kuwoMusicLogo from './images/kuwo_32.ico';

function Wrapper(props) {
  const { platform, pagination, operatingBar } = props;
  const logo = logos[platform];
  return (
    <div
      className="white-card"
      style={{
        marginTop: '10px',
      }}
    >
      <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
        <Col span={10}>
          <img src={logo} alt={platform} />
        </Col>
        <Col span={8}>
          {pagination}
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          {operatingBar}
        </Col>
      </Row>
      {props.children}
    </div>
  );
}

const logos = {
  netease: neteaseMusicLogo,
  qq: qqMusicLogo,
  kuwo: kuwoMusicLogo,
};

export default Wrapper;