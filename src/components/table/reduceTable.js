export default function reduce(state={}, action) {
    console.log("REDUCE TABLE");
    console.log(state);
    console.log(action);
    if(action.type === "TABLE_BODY")
    {
        let newState = Object.assign({},state);
        newState.table_body = action.table_body;
        console.log(newState);
        return newState;

    }
    return state;
}