export default function reduce(state = {}, action) {
    if (action.type === "AUTO_COMPLETE_STATE") {
        let newState = Object.assign({}, state);
        newState.autoCompleteState= action.autoCompleteState;
        return newState;
    }
    return state;

}