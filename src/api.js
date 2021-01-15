class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
      }

    _getResponseData(res) {
        if (res.ok) {
          return res.json().catch(() => res);
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      getMenu() {
        return fetch(this._url, {
          method: 'GET',
          headers: this._headers
        })
          .then(res => {
            return this._getResponseData(res);
          });
      }

      
}

export const apiMenu = new Api({
    url: 'https://api.storage.vigdorov.ru/store/menu_test?hook=74ad8269-0bf9-4b6c-ab1d-af8d5b4a3027',
    headers: {
      'Content-Type': 'application/json'
    }
  });

