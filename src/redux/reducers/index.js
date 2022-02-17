import { combineReducers } from 'redux';
import searchHistory from './search_history';
import searchStatus from './search_status';
import searchResults from './search_results';
import searchKeyword from './search_keyword';
import playingList from './playing_list';
import playIndex from './play_index';

export default combineReducers({
  searchHistory,
  searchStatus,
  searchResults,
  searchKeyword,
  playingList,
  playIndex,
});