import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router';

import TheHeader from './components/TheHeader';
// import TheFooter from './components/Footer';
import SearchResult from './components/SearchResult';
import SearchWithURL from './components/SearchWithURL';
import NotFound from './components/NotFound';
import TopSongs from './components/TopSongs';
import Player from './components/Player';
import Hot from './components/Hot';
import NeteasePlaylistPage from './components/NeteasePlaylistPage';
import './App.less';

const { Content } = Layout;

function App(props) {
  useScrollbarResetter();
  let { searchStatus, searchResults } = props;
  return (
    <Layout
      style={{
        backgroundColor: '#f7f7f7',
      }}
    >
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
            <Route exact path="/" component={Hot} />
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
                          <SearchResult
                            key={platform}
                            platform={platform}
                            data={searchResults[platform]}
                          />
                        ))
                      }
                      {
                        platforms.length === 0 && searchStatus === 'done' &&
                        <div className="white-card">
                          未搜索到相关歌曲。
                        </div>
                      }
                      {
                        searchStatus === 'searching' && <Spin />
                      }
                    </>
                  );
                }
              }
            />
            <Route
              path="/netease-playlist/:playlistId"
              component={NeteasePlaylistPage}
            />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </Content>
      {/* <Footer style={{ marginBottom: 80 }}>
          <TheFooter />
        </Footer> */}
      <Player />
    </Layout>
  );
}

function useScrollbarResetter() {
  const { key } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);
  return null;
}

function mapStateToProps(state) {
  return {
    searchStatus: state.searchStatus,
    searchResults: state.searchResults,
  };
}

export default connect(mapStateToProps)(App);