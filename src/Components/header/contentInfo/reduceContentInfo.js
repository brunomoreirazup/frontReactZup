export default function reduce(state = {}, action) {
  if (action.type === 'PAGE_SIZE') {
    const newState = Object.assign({}, state);
    newState.page_size = action.page_size;
    return newState;
  }

  if (action.type === 'TOTAL_ELEMENTS') {
    const newState = Object.assign({}, state);
    newState.totalElements = action.totalElements;
    return newState;
  }

  if (action.type === 'SET_USER_PREFERENCES') {
    const newState = Object.assign({}, state);
    newState.userPrefs = action.userPrefs;
    return newState;
  }
  return state;
}
