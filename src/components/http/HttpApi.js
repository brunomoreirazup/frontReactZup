import 'isomorphic-fetch';

export default class HttpApi {

    static makeGetRequest(url) {
        return fetch(url)
            .then(response => response.json());
    }

    static makeChangeRequest(url, method, payload) {

        const requestInfo = {
            method: method,
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        return fetch(url, requestInfo)
            .then(response => response.json());
        }

    static removeEntry(url){
        const requestInfo = {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        return fetch(url, requestInfo);
    }

}