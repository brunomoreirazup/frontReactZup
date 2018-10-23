export default function reduce(state = {}, action) {
  if (action.type === 'PAGES') {
    const newState = Object.assign({}, state);
    newState.pages = action.pages;
    return newState;
  }

  if (action.type === 'PAGES_CURRENT') {
    const newState = Object.assign({}, state);
    newState.pages.currentPage = action.currentPage;
  }

  // if (action.type === "PAGE_SIZE") {

  //     let newState = Object.assign({}, state);
  //     newState.page_size = action.page_size;
  //     console.log(newState);
  //     return newState;

  // }
  // if (action.type === "TABLE_BODY") {
  //     let newState = Object.assign({}, state);
  //     newState.table_body = action.table_body;
  //     console.log(newState);
  //     return newState;
  // }


  // if(action.type === "TOGGLE_MAIN_MODAL")
  // {
  //     let newState = Object.assign({},state);
  //     if(action.modalOpen === undefined)
  //         newState.modalOpen = !newState.modalOpen;
  //     else
  //         newState.modalOpen = action.modalOpen;
  //     console.log(newState);
  //     return newState;


  // }
  // if (action.type === "MAIN_MODAL_CONTENT") {
  //     let newState = Object.assign({}, state);
  //     newState.modalContent = action.modalContent;
  //     console.log(newState);
  //     return newState;


  // }

  return state;
}
