export default function reduce(state = {}, action) {

    if(action.type === "LOADING")
    {
        let newState = Object.assign({},state);
        if(action.loading === undefined)
            newState.loading = !newState.loading;
        else
            newState.loading = action.loading;
        console.log(newState.loading);
        return newState;
    }

    return state;

}