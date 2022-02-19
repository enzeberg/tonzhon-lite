const initialState = {};

const searchResults = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_SEARCH_RESULTS':
      return {
        ...state,
        [action.platform]: action.data
      }
    case 'UPDATE_SEARCH_RESULT':
      state[action.platform] = action.data;
      return {...state};
    case 'CLEAR_RESULTS':
      return {};
    default:
      return state;
  }
};

export default searchResults;