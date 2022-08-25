import { Layout, Row, Col, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import SearchBar from './SearchBar';

const { Header } = Layout;

function TheHeader() {
  return (
    <Header>
      <Row align="middle" className="container">
        <Col span={5}>
          <h1 id="site-name">
            Tonzhon Lite
          </h1>
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