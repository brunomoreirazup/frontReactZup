export default function reduce(state, action) {
    switch (action.type) {
        case "PAGES":
            return(
                action.pages
            )
    }
    return {};
}