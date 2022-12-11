// eslint-disable-line

const local = !true;
const PROD_MAIN_URI = process.env.REACT_APP_API || 'http://159.89.108.57:3102';
const DEV_MAIN_URI = local ? 'http://localhost:3102' : PROD_MAIN_URI;
const PROD_SEARCH_URI = 'https://search.comtrading.ua';
const DEV_SEARCH_URI = PROD_SEARCH_URI;

export const MAIN_URI = process.env.NODE_ENV === 'development' ? DEV_MAIN_URI : PROD_MAIN_URI;
export const SEARCH_URI = process.env.NODE_ENV === 'development' ? DEV_SEARCH_URI : PROD_SEARCH_URI;
export const IS_KTK = false;
