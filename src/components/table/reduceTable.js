export default function reduce(state = {}, action) {
    if (action.type === "TABLE_BODY") {
        let newState = Object.assign({}, state);
        newState.table_body = action.table_body;
        return newState;
    }
    return state;

}