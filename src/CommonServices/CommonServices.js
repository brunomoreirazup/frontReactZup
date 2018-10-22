import { store } from "../App";
import HttpApi from "../components/http/HttpApi";

let listFunction;
let searchFunction;

export function setFunction(list, search) {
    listFunction = list;
    searchFunction = search;
}

let listType = 'list';

export function setListType(list) {
    listType = list;
}


export default class CommonServices {

    static validateFields(input) {
        if (input.value === "") {
            this.callAlertModal("blank", "CHANGE_MODAL_CONTENT", 2000);
            input.focus();
            return true;
        }
        return false;
    }

    static callAlertModal(showAlertType, actionType, time) {
        store.dispatch({ type: "CHANGE_MODAL_CONTENT", showAlert: showAlertType });
        setTimeout(() => store.dispatch({ type: actionType, modalOpen: false }), time);

    }

    static storeSizeSearch(json) {
        let size =
        {
            sizePage: json.length
        };

        store.dispatch({ type: "TOTAL_ELEMENTS", totalElements: size });
    }


    static changeStorePages(json) {
        let page =
        {
            homePage: 1,
            lastPage: json.page.totalPages,
            currentPage: json.page.number + 1

        };
        store.dispatch({ type: 'PAGES', pages: page });
    }

    static storeSizePages(json) {
        let size =
        {
            sizePage: json.page.totalElements
        };

        store.dispatch({ type: "TOTAL_ELEMENTS", totalElements: size });
    }

    static mountUrl(tableType) {
        let state = store.getState();
        let page = state.reduceFooter.pages.currentPage;
        let sizePage = state.reduceContentInfo.page_size;
        let sort = state.reduceTable.sort_order;

        let url = `https://customers-challenge.herokuapp.com/${tableType}?page=${page - 1}&size=${sizePage}&sort=name,${sort}`;

        return url;
    }

    static list(tableType) {
        store.dispatch({ type: 'LOADING', showLoading: true });
        listType = 'list';
        const url = this.mountUrl(tableType);
        return HttpApi.makeGetRequest(url)
            .then(lista => {
                this.changeStorePages(lista);
                this.storeSizePages(lista);
                return lista;
            });
    }

    static reloadList(newLista) {
        store.dispatch({ type: 'TABLE_BODY', table_body: newLista });
        store.dispatch({ type: 'LOADING', showLoading: false });
    }

    static removePageInfo(newLista) {
        store.dispatch({ type: 'PAGE_SIZE', page_size: null });
        store.dispatch({ type: 'PAGES', page: null });
    }

    static isSearchValid(name) {
        if (this.isSearchEmpty(name) || !this.isCharValid(name)) {
            let defaultPages =
            {
                homePage: 1,
                lastPage: 1,
                currentPage: 1
            };

            store.dispatch({ type: 'PAGES', pages: defaultPages });
            store.dispatch({ type: "PAGE_SIZE", page_size: 5 });

            listFunction();

            return true;
        }
        listType = 'search';
        return false
    }

    static isSearchEmpty(name){
        if(!name){
            return true;
        }
        return false;
    }

    static isCharValid(name){
        for(let i = 0; i<name.length;i++){
            let asciiChar = name.charCodeAt(i);
            console.log(asciiChar);
            if((asciiChar >= 33 && asciiChar <= 64) ||( asciiChar >= 91 && asciiChar <= 96 )||( asciiChar >= 123 && asciiChar <= 126) ){
                return false;
            }
        }
        return true;
    }

    static callTable() {
        if (listType === 'search') {
            let keyword = store.getState().reduceSearch.search;
            searchFunction(keyword);
        }
        else listFunction();
    }

    static sendData(url, method, payload) {
        HttpApi.makeChangeRequest(url, method, payload)
            .then((result) => {
                if(result.status >= 300) throw new Error("status >= 300");
                this.callTable();
                this.callAlertModal("success", "TOGGLE_MAIN_MODAL", 1500);
            })
            .catch((e) => {
                console.log(e);
                this.callAlertModal("fail", "CHANGE_MODAL_CONTENT", 2000);
            });
    }

}

