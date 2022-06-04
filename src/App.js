import { connect } from 'react-redux';
import { Layout } from 'antd';

import TheHeader from './components/TheHeader';
import TopSongs from './components/TopSongs';
import Result from './components/Result';
import Player from './components/Player';
import './App.less';

const { Content } = Layout;

function App(props) {
  let { searchStatus, searchResults } = props;
  const platforms = Object.keys(searchResults);
  return (
    <Layout>
      <TheHeader />
      <Content>
        <div
          className="container"
          style={{
            marginTop: 60,
            marginBottom: 74,
            minHeight: 800,
          }}
        >
          <TopSongs />
          {
            platforms.map((platform) => (
              <Result
                key={platform}
                platform={platform}
                data={searchResults[platform]}
              />
            ))
          }
          {
            platforms.length === 0 && searchStatus === 'done' &&
            <div className="white-card">
              No related songs were found.
            </div>
          }
        </div>
      </Content>
      <Player />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    searchStatus: state.searchStatus,
    searchResults: state.searchResults,
  };
}

export default connect(mapStateToProps)(App);