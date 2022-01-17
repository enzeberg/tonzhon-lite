import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <div style={{ textAlign: 'center' }}>
      <a href="https://github.com/enzeberg/tonzhon-lite"
        target="blank"
      >
        <GithubOutlined style={{ fontSize: 'large' }} />
      </a>
    </div>
  );
}

export default Footer;