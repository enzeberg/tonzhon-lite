import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { GithubOutlined } from '@ant-design/icons';

import SearchBar from './SearchBar';
import { themeColor } from '../config';

const { Header } = Layout;

function TheHeader() {
  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        height: 50,
        zIndex: 2,
        // borderBottom: '1px solid #DBDBDB',
        padding: '6px 0',
        boxShadow: '0 1px 3px rgba(26,26,26,.1)',
      }}
    >
      <Row type="flex" align="middle" className="container">
        <Col span={6}>
          <Link to="/">
            <h1
              style={{
                display: 'inline',
                color: themeColor,
                fontWeight: 360,
                fontSize: 'x-large',
              }}
            >
              Tonzhon Lite
            </h1>
          </Link>
        </Col>
        <Col span={4}>
          <Link to="/netease-playlist/6774517990" style={{ fontSize: 16 }}>
            网易歌单
          </Link>
        </Col>
        <Col span={10}>
          <SearchBar />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          {/* <a href="https://github.com/enzeberg/tonzhon-lite"
              target="blank"
            >
              <GithubOutlined style={{ fontSize: 'large' }} />
            </a> */}
          <Button icon={<GithubOutlined style={{ fontSize: 'large' }} />}
            href="https://github.com/enzeberg/tonzhon-lite"
            target="_blank"
          >
            GitHub
          </Button>
        </Col>
      </Row>
    </Header>
  );
}

export default TheHeader;