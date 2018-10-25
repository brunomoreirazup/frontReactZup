export default function reduce(state = {}, action) {
  if (action.type === 'PAGES') {
    const newState = Object.assign({}, state);
    newState.pages = action.pages;
    return newState;
  }

  if (action.type === 'PAGES_CURRENT') {
    const newState = Object.assign({}, state);
    newState.pages.currentPage = action.currentPage;
  }
  return state;
}
