import { createStore } from 'redux';
import reducers from '../reducers';

const platforms = ['qq', 'netease', 'kuwo'];
const store = createStore(reducers);
let lastKeyword = store.getState().searchKeyword;

store.subscribe(() => {
  const { searchKeyword } = store.getState();
  if (searchKeyword !== lastKeyword) {
    lastKeyword = searchKeyword;
    whenSearchStarts();
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
            whenResultResponds(platform, data);
          }
          ++resultsResponded;
          if (resultsResponded === platforms.length) {
            whenSearchEnds();
          }
        })
        .catch(err => {
          console.log('err ', err);
        });
    });
  }
});

const whenSearchStarts = () => {
  store.dispatch({ type: 'CLEAR_RESULTS' });
  store.dispatch({ type: 'UPDATE_SEARCH_STATUS', data: 'searching' });
};

const whenResultResponds = (platform, data) => {
  store.dispatch({
    type: 'INITIAL_SEARCH_RESULTS', platform, data
  });
};

const whenSearchEnds = () => {
  store.dispatch({ type: 'UPDATE_SEARCH_STATUS', data: 'done' });
};

export default store;