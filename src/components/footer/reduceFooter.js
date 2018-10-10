export default function reduce(state={}, action) {
    console.log("ReduceFoot:");
    console.log(state);
    console.log(action);
    if(action.type ===  "PAGES")
    {

        let newState = Object.assign({},state);
        newState.pages = action.pages;
        console.log(newState);
        return newState;

    }
    if(action.type === "TABLE_BODY")
    {
        let newState = Object.assign({},state);
        newState.table_body = action.table_body;
        console.log(newState);
        return newState;

    }

    if(action.type === "SEARCH"){
        let newState = Object.assign({},state);
        newState.lista= action.pages;
        return newState;
    }

    return state;

}