// eslint-disable-line
import { MAIN_URI, SEARCH_URI } from './config';
import Cookies from 'js-cookie';

const defaultLang = 'ua';

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line
  );
}

const seed = uuidv4()

async function fetch(url, opts = {}) {
  opts.credentials = 'include'
  const h = opts.headers = opts.headers || {}
  h.seed = seed
  return window.fetch(url, opts)
}

export const api = new class Api {
    MAIN_URI = MAIN_URI;
    SEARCH_URI = SEARCH_URI;

    getCategoriesList = async () => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/categories?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getCategoryDetails = async (id) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/categories/${id}?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getProductsList = async (params, user, authorized) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/products?lang=${lang}`;
        if (window.location.search.indexOf('test=true') !== -1) {
            params.is_test = true;
        }
        if (Object.keys(params).length > 0) {
            const query = Object.keys(params)
                .map((k) => {
                    return k === 'options' || k === 'brands' ? encodeURIComponent(k) + '=[' + params[ k ].join(',') + ']'
                        : encodeURIComponent(k) + '=' + encodeURIComponent(params[ k ]);
                })
                .join('&');
            url = url + '&' + query;
        }
        const body = authorized ? {uid: user.customer_id} : {};
        if (user && user.group) {
            body.group = user.group;
        }
        const header = authorized ? {
            method:      'POST', // *GET, POST, PUT, DELETE, etc.
            mode:        'cors', // no-cors, cors, *same-origin
            cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers:     {
                Accept:         'application/json',
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body),
        } : {
            method: 'GET',
        };
        const response = await fetch(
            url,
            header,
        );
        const result = await response.json();

        return result;
    }

    getSaleList = async (params, user, authorized) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/sale?lang=${lang}`;
        if (window.location.search.indexOf('test=true') !== -1) {
            params.is_test = true;
        }
        if (Object.keys(params).length > 0) {
            const query = Object.keys(params)
                .map((k) => {
                    return k === 'options' || k === 'brands' ? encodeURIComponent(k) + '=[' + params[ k ].join(',') + ']'
                        : encodeURIComponent(k) + '=' + encodeURIComponent(params[ k ]);
                })
                .join('&');
            url = url + '&' + query;
        }
        const body = authorized ? {uid: user.customer_id} : {};
        if (user && user.group) {
            body.group = user.group;
        }
        const header = authorized ? {
            method:      'POST', // *GET, POST, PUT, DELETE, etc.
            mode:        'cors', // no-cors, cors, *same-origin
            cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers:     {
                Accept:         'application/json',
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body),
        } : {
            method: 'GET',
        };
        const response = await fetch(
            url,
            header,
        );
        const result = await response.json();

        return result;
    }

    getProductDetails = async (slug, user, authorized, cashless) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/products/${slug}?lang=${lang}&cashless=${cashless}${
            window.location.search.indexOf('test=true') !== -1 ? '&is_test=true' : ''
        }`;
        const body = authorized ? {uid: user.customer_id} : {};
        if (user && user.group) {
            body.group = user.group;
        }
        body.referrer = window.document.referrer
        const header = authorized || 1 ? {
            method:      'POST', // *GET, POST, PUT, DELETE, etc.
            mode:        'cors', // no-cors, cors, *same-origin
            cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers:     {
                Accept:         'application/json',
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body),
        } : {
            method: 'GET',
        };

        const response = await fetch(
            url,
            header,
        );
        const result = await response.json();

        return result;
    }

    getConfig = async () => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/config_data?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getSlider = async () => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/slider?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getMining = async (user, authorized, cashless) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/mining?lang=${lang}&cashless=${cashless}`;
        const body = authorized ? {uid: user.customer_id} : {};
        if (user && user.group) {
            body.group = user.group;
        }
        const header = authorized ? {
            method:      'POST', // *GET, POST, PUT, DELETE, etc.
            mode:        'cors', // no-cors, cors, *same-origin
            cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers:     {
                Accept:         'application/json',
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body),
        } : {
            method: 'GET',
        };

        const response = await fetch(
            url,
            header,
        );
        const result = await response.json();

        return result;
    }

    getAnalysis = async (id) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/mcparana/${id}?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getProductPrices = async (id) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/getProductPrices/${id}?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getRate = async () => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/rate?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getPage = async (path, lang) => {
        let url = `${this.MAIN_URI}/page${path}?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getPrices = async () => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/prices?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    createOrder = async (order) => {
        const lang = Cookies.get('cl') || defaultLang;
        const orderString = JSON.stringify(order);
        const data = btoa(encodeURIComponent(orderString));
        const url = `${this.MAIN_URI}/new_order?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({data: data}),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    setServiceRequest = async (values) => {
        const lang = Cookies.get('cl') || defaultLang;
        const valuesString = JSON.stringify(values);
        const data = btoa(encodeURIComponent(valuesString));
        const url = `${this.MAIN_URI}/service_request?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({data: data}),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }


    search = async (query, user, authorized) => {
        const lang = Cookies.get('cl') || defaultLang;
        if (window.location.search.indexOf('test=true') !== -1) {
            query.is_test = true;
        }
        const url = `${this.MAIN_URI}/search?lang=${lang}`;
        if (authorized) {
            query.uid = user.customer_id;
            if (user && user.group) {
                query.group = user.group;
            }
        }
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(query),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    searchSuggest = async (query) => {
        const url = `${this.SEARCH_URI}/suggest/_search`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(query),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    multiSearchSuggest = async (query) => {
        const url = `https://api.multisearch.io/?id=11904&query=${query}&uid=cc441f080&autocomplete=true`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }


    getProductReview = async (productUID) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/review/${productUID}?lang=${lang}`;

        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    setLogin = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        const url = `${this.MAIN_URI}/login?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    setRegister = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        const url = `${this.MAIN_URI}/register?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    setForgot = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        const url = `${this.MAIN_URI}/forgot?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    editAccount = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        const url = `${this.MAIN_URI}/account-edit?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    editPassword = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        const dataString = JSON.stringify(data);
        const newData = btoa(encodeURIComponent(dataString));
        const url = `${this.MAIN_URI}/account-password?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({data: newData}),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    editAddress = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        const url = `${this.MAIN_URI}/account-address?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            },
        );

        const result = await response.json();

        if (result) {
            return result;
        }

        return null;
    }

    getAccountOrders = async (query) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/account-orders?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(query),
            },
        );
        const result = await response.json();

        return result;
    }

    getAccountOrderDetails = async (order_id) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/account-order/${order_id}?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    getDelivery = async (id) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/delivery-time/${id}?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
            },
        );
        const result = await response.json();

        return result;
    }

    searchUser = async (query) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/account-search?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(query),
            },
        );
        const result = await response.json();

        return result;
    }

    NpApi = async (query) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/np_search?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(query),
            },
        );
        const result = await response.json();

        return result;
    }

    setSupplierData = async (query) => {
        let url = `${this.MAIN_URI}/supplier_data`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(query),
            },
        );
        const result = await response.json();

        return result;
    }

    smsStock = async (query) => {
        let url = `${this.MAIN_URI}/set_notify`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(query),
            },
        );
        const result = await response.json();

        return result;
    }

    getPricesHistory = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/getPricesHistory?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            },
        );
        const result = await response.json();

        return result;
    }

    removeAccount = async (data) => {
        const lang = Cookies.get('cl') || defaultLang;
        let url = `${this.MAIN_URI}/account-remove?lang=${lang}`;
        const response = await fetch(
            url,
            {
                method:      'POST', // *GET, POST, PUT, DELETE, etc.
                mode:        'cors', // no-cors, cors, *same-origin
                cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers:     {
                    Accept:         'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            },
        );
        const result = await response.json();

        return result;
    }
}();
