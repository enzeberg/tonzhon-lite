import { combineReducers } from 'redux';
import searchStatus from './search_status';
import searchResults from './search_results';
import searchKeyword from './search_keyword';
import playingList from './playing_list';
import playIndex from './play_index';

export default combineReducers({
  searchStatus,
  searchResults,
  searchKeyword,
  playingList,
  playIndex,
});