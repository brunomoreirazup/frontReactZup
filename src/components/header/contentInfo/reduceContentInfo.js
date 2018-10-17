export default function reduce(state = {}, action) {
    if (action.type === "PAGE_SIZE") {

        let newState = Object.assign({}, state);
        newState.page_size = action.page_size;
        return newState;

    }
    if (action.type === "TOTAL_ELEMENTS") {

        let newState = Object.assign({}, state);
        newState.totalElements = action.totalElements;
        return newState;

    }
    return state;

}