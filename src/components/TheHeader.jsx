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
        zIndex: 2,
        boxShadow: '0 1px 3px rgba(26,26,26,.1)',
      }}
    >
      <Row align="middle" className="container">
        <Col span={5}>
          <Link to="/">
            <h1
              style={{
                display: 'inline',
                color: themeColor,
                fontWeight: 360,
                fontSize: '24px',
              }}
            >
              Tonzhon Lite
            </h1>
          </Link>
        </Col>
        <Col span={14}>
          <SearchBar />
        </Col>
        <Col span={5} style={{ textAlign: 'right' }}>
          <Button
            icon={
              <GithubOutlined style={{ fontSize: 'large' }} />
            }
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