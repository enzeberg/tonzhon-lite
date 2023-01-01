import { Row, Col, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import SearchBar from './SearchBar';

function TheHeader() {
  return (
    <header>
      <Row align="middle" className="container">
        <Col span={5}>
          <span id="site-name">
            Tonzhon Lite
          </span>
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
    </header>
  );
}

export default TheHeader;