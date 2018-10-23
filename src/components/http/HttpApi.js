/* global fetch */
/* global Headers */
export default class HttpApi {
  static makeGetRequest(url) {
    return fetch(url)
      .then(response => response.json());
  }

  static makeChangeRequest(url, method, payload) {
    const requestInfo = {
      method,
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-type': 'application/json',
      }),
    };
    return fetch(url, requestInfo);
  }
}
