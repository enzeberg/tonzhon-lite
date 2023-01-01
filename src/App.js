import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';

import TheHeader from './components/TheHeader';
import TopSongs from './components/TopSongs';
import Result from './components/Result';
import Player from './components/Player';
import './App.css';

function App(props) {
  let { searchStatus, searchResults } = props;
  const platforms = Object.keys(searchResults);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'orange',
        },
      }}
    >
      <TheHeader />
      <div
        className="container"
        style={{
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
      <Player />
    </ConfigProvider>
  );
}

function mapStateToProps(state) {
  return {
    searchStatus: state.searchStatus,
    searchResults: state.searchResults,
  };
}

export default connect(mapStateToProps)(App);