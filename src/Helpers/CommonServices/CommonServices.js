import HttpServices from '../HttpServices/HttpServices';

let listFunction;
let searchFunction;
let store;
export const urlApi = 'https://customers-challenge-vinicius.herokuapp.com';

export function setFunction(list, search) {
  listFunction = list;
  searchFunction = search;
}

let listType = 'list';

export function setListType(list) {
  listType = list;
}
export function setStore(storeValue) {
  store = storeValue;
}
export default class CommonServices {
  static validateFields(input) {
    if (input.value === '') {
      this.callAlertModal('blank', 'CHANGE_MODAL_CONTENT', 2000);
      input.focus();
      return true;
    }
    return false;
  }

  static callAlertModal(showAlertType, actionType, time) {
    store.dispatch({ type: 'CHANGE_MODAL_CONTENT', showAlert: showAlertType });
    setTimeout(() => store.dispatch({ type: actionType, modalOpen: false }), time);
  }

  static storeSizeSearch(json) {
    const size = { sizePage: json.length };
    store.dispatch({ type: 'TOTAL_ELEMENTS', totalElements: size });
  }

  static changeStorePages(json) {
    const page = {
      homePage: 1,
      lastPage: json.page.totalPages,
      currentPage: json.page.number + 1,
    };
    store.dispatch({ type: 'PAGES', pages: page });
  }

  static storeSizePages(json) {
    const size = { sizePage: json.page.totalElements };
    store.dispatch({ type: 'TOTAL_ELEMENTS', totalElements: size });
  }

  static mountUrl() {
    const state = store.getState();
    const page = state.reduceFooter.pages.currentPage;
    const sizePage = state.reduceContentInfo.page_size;
    const sort = state.reduceTable.sort_order;

    const url = `page=${page - 1}&size=${sizePage}&sort=name,${sort}`;

    return url;
  }

  static list(tableType) {
    store.dispatch({ type: 'LOADING', showLoading: true });
    listType = 'list';
    const url = `${urlApi}/${tableType}?${this.mountUrl(tableType)}`;
    return HttpServices.makeGetRequest(url)
      .then((lista) => {
        this.changeStorePages(lista);
        this.storeSizePages(lista);
        return lista;
      });
  }

  static reloadList(newLista) {
    store.dispatch({ type: 'TABLE_BODY', table_body: newLista });
    store.dispatch({ type: 'LOADING', showLoading: false });
  }

  static removePageInfo() {
    listType = 'search';
    store.dispatch({ type: 'PAGE_SIZE', page_size: null });
    store.dispatch({ type: 'PAGES', page: null });
  }

  static emptySearch(name) {
    const storeState = store.getState();
    const { userPrefs } = storeState.reduceContentInfo;
    if (!name) {
      const defaultPages = {
        homePage: 1,
        lastPage: 1,
        currentPage: 1,
      };
      store.dispatch({ type: 'PAGES', pages: defaultPages });
      store.dispatch({ type: 'PAGE_SIZE', page_size: userPrefs });

      listFunction();

      return true;
    }
    return false;
  }

  static callTable() {
    if (listType === 'search') {
      const keyword = store.getState().reduceSearch.search;
      searchFunction(keyword);
    } else listFunction();
  }

  static sendData(url, method, payload) {
    HttpServices.makeChangeRequest(url, method, payload)
      .then((result) => {
        if (result.status >= 400) {
          throw new Error('status >= 400');
        }
        this.callTable();
        this.callAlertModal('success', 'TOGGLE_MAIN_MODAL', 1500);
      })
      .catch(() => {
        this.callAlertModal('fail', 'TOGGLE_MAIN_MODAL', 2000);
      });
  }
}
