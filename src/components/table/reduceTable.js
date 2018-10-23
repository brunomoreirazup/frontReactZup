export default function reduce(state = {}, action) {
  if (action.type === 'TABLE_BODY') {
    const newState = Object.assign({}, state);
    newState.table_body = action.table_body;
    return newState;
  }

  if (action.type === 'SORT') {
    const newState = Object.assign({}, state);
    if (action.sort_order) {
      newState.sort_order = action.sort_order;
    } else if (newState.sort_order === 'asc') {
      newState.sort_order = 'desc';
    } else newState.sort_order = 'asc';
    return newState;
  }
  return state;
}
