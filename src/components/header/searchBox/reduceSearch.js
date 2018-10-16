export default function reduce(state = {}, action) {
    if (action.type === 'SEARCH') {
        let newState = Object.assign({}, state);
        newState.search = action.keyword;
        return newState;
    }
    return state;
}