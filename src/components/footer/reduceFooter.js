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
    if(action.type === "TOGGLE_MAIN_MODAL")
    {
        let newState = Object.assign({},state);
        if(action.modalOpen === undefined)
            newState.modalOpen = !newState.modalOpen;
        else
            newState.modalOpen = action.modalOpen;
        console.log(newState);
        return newState;


    }
    if(action.type === "MAIN_MODAL_CONTENT")
    {
        let newState = Object.assign({},state);
        newState.modalContent = action.modalContent;
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