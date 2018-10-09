export default function reduce(state={}, action) {
    console.log("REDUCE TABLE");
    console.log(state);
    console.log(action);
    switch (action.type) {
        case "TABLE_HEAD":
           return state;
        case "TABLE_BODY":
            return state;
        default:
            console.log(state);
            return state;
    }
}