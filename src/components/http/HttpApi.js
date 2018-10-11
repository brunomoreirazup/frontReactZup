import 'isomorphic-fetch';

export default class HttpApi {
    static getAllCities(url) {
        console.log(url);
            return fetch(url)
                .then(response => response.json())
                .then(content => {
                    return content;
                });
        }
    }