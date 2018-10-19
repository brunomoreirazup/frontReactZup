import 'isomorphic-fetch';

export default class HttpApi {

    static makeGetRequest(url) {
        return fetch(url)
            .then(response => response.json());
    }

    static makeChangeRequest(url, method, payload) {

        let requestInfo = {
            method: method,
            body : JSON.stringify(payload),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        return fetch(url, requestInfo);
    }
}