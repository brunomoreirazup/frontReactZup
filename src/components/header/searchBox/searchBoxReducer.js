export default function reduce(state={},action){

    switch(action.type){
        case "SEARCH":
            let newState = Object.assign({},state);

            newState.pages = action.pages;

            return newState;
    }

    return state;
}