export default function reduce(state = {}, action) {

    if(action.type === "LOADING")
    {
        let newState = Object.assign({},state);
        if(action.showLoading === undefined)
            newState.showLoading = !newState.showLoading;
        else
            newState.showLoading = action.showLoading;
        return newState;
    }

    return state;

}