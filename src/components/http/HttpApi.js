import 'isomorphic-fetch';

export default class HttpApi {

    static getAllCities(url) {
        console.log(url);
        return fetch(url)
            .then(response => response.json());
    }

    static makeChangeRequest(url, method, payload){
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

}