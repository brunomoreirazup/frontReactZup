export default function reduce(state={},action){

    if(action.type === "AUTOCOMPLETE"){

        let newState = Object.assign({}, state);
        newState.customerCity = action.customerCity;
        return newState;

    }

    return state;
}