import { createStore } from 'redux';
import reducers from '../reducers';

const platforms = ['qq', 'netease', 'kuwo'];
const store = createStore(reducers);
let lastKeyword = store.getState().searchKeyword;

store.subscribe(() => {
  const { searchKeyword } = store.getState();
  if (searchKeyword !== lastKeyword) {
    lastKeyword = searchKeyword;
    updateSearchHistory(searchKeyword);
    onSearch();
    let resultsResponded = 0;
    platforms.forEach((platform) => {
      fetch(
        `/api/search?keyword=${searchKeyword}&platform=${platform}`,
        {
          // withCredentials: true
          credentials: 'include'
        }
      )
        .then(res => res.json())
        .then(json => {
          const { success, data } = json;
          if (success && data.total > 0) {
            onResultResponded(platform, data);
          }
          ++resultsResponded;
          if (resultsResponded === platforms.length) {
            searchEnded();
          }
        })
        .catch(err => {
          console.log('err ', err);
        });
    });
  }
});

const onSearch = () => {
  store.dispatch({ type: 'CLEAR_RESULTS' });
  store.dispatch({ type: 'UPDATE_SEARCH_STATUS', data: 'searching' });
};

const onResultResponded = (platform, data) => {
  store.dispatch({
    type: 'INITIAL_SEARCH_RESULTS', platform, data
  });
};

const searchEnded = () => {
  store.dispatch({ type: 'UPDATE_SEARCH_STATUS', data: 'done' });
};

const updateSearchHistory = (keyword) => {
  store.dispatch({ type: 'UPDATE_SEARCH_HISTORY', data: keyword });
};

export default store;