// eslint-disable-line
export const book = Object.freeze({

    common: {
        home: {
            path:      '/',
            component: 'Home',
        },
        search: {
            path:      '/search/',
            component: 'Search',
        },
        sale: {
            path:      '/sale/',
            component: 'Sale',
            name:  'Распродажа',
        },
        compare: {
            path:      '/compare/:category_id',
            component: 'Compare',
        },
        wish_list: {
            path:      '/wishlist/',
            component: 'WishList',
        },
        notFound: {
            path:      '/404/',
            component: 'NoMatch',
        },
    },
    pages: {
        service: {
            path:      '/service/',
            component: 'Page',
            name:      'Услуги',
        },
        howToBuy: {
            path:      '/how-to-buy/',
            component: 'Page',
            name:      'Как купить',
        },
        contact: {
            path:      '/contact/',
            component: 'Contact',
            name:      'Контакты',
        },
        warranty: {
            path:      '/warranty/',
            component: 'Page',
        },
        aboutUs: {
            path:      '/about_us/',
            component: 'Page',
        },
        corporate: {
            path: '/corporative-clients/',
            component: 'Page',
            name: 'Корпоративным клиентам',
        },
        prices: {
            path: 'https://api2.comtrading.ua/price_retail.xlsx',
            component: 'Prices',
            name: 'Скачать прайс',
        },
        suppliers: {
            path: '/suppliers/',
            component: 'Page',
            name:  'Поставщикам',
        },
        privacy: {
            path: '/privacy/',
            component: 'Page',
        },
        publicOffer: {
            path: '/public-offer/',
            component: 'Page',
        },
    },
    category: {
        topLevel: {
            path:      '/:slug/',
            component: 'Category',
        },
        firstLevel: {
            path:      '/:top/:slug/',
            component: 'Category',
        },
        secondLevel: {
            path:      '/:top/:first/:slug/',
            component: 'Category',
        },
        filter: {
            path:      '/:top/:first/:slug/proizvoditel::filter/',
            component: 'Category',
        },
        page: {
            path:      '/:top/:first/:slug/page-:page/',
            component: 'Category',
        },
    },
    product: {
        home: {
            path:      '/prod-:slug/',
            component: 'ProductDetails',
        },
        homeDifferent: {
            path:      '/:id-prod-:slug/',
            component: 'ProductDetails',
        },
    },
    mining: {
        home: {
            path:      '/mining/',
            component: 'Mining',
        },
    },
    checkout: {
        home: {
            path:      '/checkout/',
            component: 'Checkout',
        },
        success: {
            path:      '/success/',
            component: 'CheckoutSuccessContainer',
        },
    },
    account: {
        home: {
            path:      '/account/',
            component: 'Account',
        },
        change_account: {
            path:      '/account-edit/',
            component: 'Account',
        },
        change_password: {
            path:      '/account-password/',
            component: 'Account',
        },
        change_address: {
            path:      '/account-address/',
            component: 'Account',
        },
        order: {
            path:      '/order/',
            component: 'Account',
        },
        orderDetails: {
            path:      '/order-details/:order_id',
            component: 'Account',
        },
        newsletter: {
            path:      '/newsletter/',
            component: 'Account',
        },
    },
});
