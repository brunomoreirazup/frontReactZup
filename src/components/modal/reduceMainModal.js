export default function reduce(state = {}, action) {
    
    if(action.type === "TOGGLE_MAIN_MODAL")
    {
        let newState = Object.assign({},state);
        if(action.modalOpen === undefined)
            newState.modalOpen = !newState.modalOpen;
        else
            newState.modalOpen = action.modalOpen;
        return newState;


    }
    if (action.type === "MAIN_MODAL_CONTENT") {
        let newState = Object.assign({}, state);
        newState.modalContent = action.modalContent;
        return newState;


    }
    return state;

}