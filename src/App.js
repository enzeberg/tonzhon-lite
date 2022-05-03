import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import TheHeader from './components/TheHeader';
import NeteasePlaylistPage from './components/NeteasePlaylistPage';
import TopSongs from './components/TopSongs';
import Result from './components/Result';
import SearchWithURL from './components/SearchWithURL';
import Player from './components/Player';
import './App.less';

const { Content } = Layout;

function App(props) {
  let { searchStatus, searchResults } = props;
  return (
    <Layout>
      <Switch>
        <Route path="/search" component={SearchWithURL} />
      </Switch>
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
          <Switch>
            <Route exact path="/" component={NeteasePlaylistPage} />
            <Route
              path="/search"
              render={
                () => {
                  const platforms = Object.keys(searchResults);
                  return (
                    <>
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
                    </>
                  );
                }
              }
            />
          </Switch>
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