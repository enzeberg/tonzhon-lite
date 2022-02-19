import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);
const { searchKeyword } = store.getState();
const platforms = ['qq', 'netease', 'kuwo'];
let lastKeyword = searchKeyword;

store.subscribe(() => {
  const { searchKeyword } = store.getState();
  if (searchKeyword !== lastKeyword) {
    // 更新 lastKeyword 必须放在包含dispatch方法的函数前面，否则会造成无限递归
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
          const { searchSuccess, data } = json;
          if (searchSuccess && data.totalCount > 0) {
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