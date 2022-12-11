// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { text } from './settings';

export const formatNumber = (number, settings) => {
    const x = 3;
    const floatNumber = parseFloat(number || 0) || 0;

    const re = `\\d(?=(\\d{${x}})+${settings.decimal_number > 0 ? '\\D' : '$'})`;

    const num = floatNumber.toFixed(
        Math.max(0, Math.floor(settings.decimal_number)),
    );

    return (settings.decimal_separator
        ? num.replace('.', settings.decimal_separator)
        : num
    ).replace(new RegExp(re, 'g'), `$&${settings.thousand_separator}`);
};

const amountPattern = '{amount}';
export const formatCurrency = (number = 0, settings) => settings.currency_format.replace(
    amountPattern,
    formatNumber(number, settings),
);

export const getWarranty = (str, currentLang) => {
    let text = '';
    if (str) {
        const jan = Number(str);
        text = str;
        if (jan && Number.isInteger(jan)) {
            text = str + ' ' + (currentLang === 'ua' ? 'міс' : 'мес');
        }
    }
    
    return text;
};

export const getUrl = (path, id) => {
    if (path && path.length > 0) {
        const fullPath = '/' + path + '/';

        return fullPath;
    }

    if (id && id.length > 0) {
        const fullPath = '/prod-' + id + '/';

        return fullPath;
    }

    return '/';
};

export const getThumbnailUrl = (originalUrl, width) => {
    if (originalUrl && originalUrl.length > 0) {
        const path = originalUrl.split('.');
        const ext = path[path.length - 1];
        const thumbnailUrl = `https://img.comtrading.ua/image/cache/${originalUrl.replace('.' + ext, '-' + width + '.' + ext)}`;

        return thumbnailUrl;
    }

    return '';
};

export const getImageUrl = (originalUrl) => {
    if (originalUrl && originalUrl.length > 0) {
        const thumbnailUrl = `https://img.comtrading.ua/image/${originalUrl}`;

        return thumbnailUrl;
    }

    return '';
};

export const getSlideUrl = (originalUrl) => {
    if (originalUrl && originalUrl.length > 0) {
        const thumbnailUrl = `https://img.comtrading.ua${originalUrl}`;

        return thumbnailUrl;
    }

    return '';
};

export const getParentIds = (categories, id) => {
    let categoryId = id;
    const parentIds = [];
    let parentExists = false;

    do {
        // eslint-disable-next-line
        const category = categories.find((item) => item.id === categoryId);
        parentExists = category && category.parent_id;
        if (parentExists) {
            parentIds.push(category.parent_id);
            categoryId = category.parent_id;
        }
    } while (parentExists);

    return parentIds;
};

export const getQueryStringValue = (key) => {
    // eslint-disable-next-line
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

export const getCategoryBySlug = (categories, slug) => {

    const category = categories
            .filter((category) => {
                if (category.slug === slug) {
                    return category;
                }
                return null;
            });

    return category[0];
};

export const getCategoryById = (categories, id) => {

    const category = categories
            .filter((category) => {
                if (category.id === Number(id)) {
                    return category;
                }
                return null;
            });

    return category[0];
};

export const getProductBreadcrumbs = (product, categories) => {
    if (product && product.category_id) {
        const ids = [ product.category_id ];
        const parentIds = getParentIds(categories, product.category_id);
        ids.push(...parentIds);

        let index = 0;
        const breadcrumbs = ids
            .reverse()
            .map((categoryId) => {
                const category = categories.find((item) => item.id === categoryId);
                if (category) {
                    index += 1;

                    return (
                        <li key = { index }>
                            <NavLink to = { category.path }>{category.name}</NavLink>
                        </li>
                    );
                }

                return null;
            })
            .filter((item) => !!item);

        return breadcrumbs;
    }

    return null;
};

export const refProductCode = (product) => {
    const suf = { hotline: 'AYH', ekatalog: 'ANE', vse: 'IFV' }
    const mp = product.useMP && suf[product.useMP] || '' // eslint-disable-line
    return 'id' in product && product.id + mp || '' // eslint-disable-line
}
export const sanitizeSearch = (text) => {
  return (text || '').trim().replace(/\b(\d+)(AYH|ANE|IFV)\b/, "$1")
}

export const getCategoryBreadcrumbs = (currentCategoryId, categories) => {
    if (currentCategoryId) {
        const ids = getParentIds(categories, currentCategoryId);

        let index = 0;
        const breadcrumbs = ids
            .reverse()
            .map((categoryId) => {
                const category = categories.find((item) => item.id === categoryId);
                if (category) {
                    index += 1;

                    return (
                        <li key = { index }>
                            <NavLink to = { category.path }>{category.name}</NavLink>
                        </li>
                    );
                }

                return null;
            })
            .filter((item) => !!item);

        return breadcrumbs;
    }

    return null;
};

export const getShippingMethodFromOrder = (order, shippingMethods) => {
    if (
        order && order.shipping_method_id && shippingMethods && shippingMethods.length > 0
    ) {
        return shippingMethods.find(
            (method) => method.id === order.shipping_method_id,
        );
    }

    return null;
};

export const getPaymentMethodFromOrder = (order, paymentMethods) => {
    if (
        order && order.shipping_method_id && paymentMethods && paymentMethods.length > 0
    ) {
        return paymentMethods.find((method) => method.id === order.payment_method_id);
    }

    return null;
};

export const getFieldLabelByKey = (key) => {
    switch (key) {
        case 'full_name':
            return text.fullName;
        case 'address1':
            return text.address1;
        case 'address2':
            return text.address2;
        case 'postal_code':
            return text.postal_code;
        case 'phone':
            return text.phone;
        case 'company':
            return text.company;
        case 'password':
            return text.password;
        case 'mobile':
            return text.mobile;
        case 'city':
            return text.city;
        case 'state':
            return text.state;
        case 'country':
            return text.country;
        case 'comments':
            return text.comments;
        default:
            return '';
    }
};

export const getShippingFieldLabelOrderSuccess = (key) => getFieldLabelByKey(key);

export const getShippingFieldLabel = ({ label, key }) => label
&& label.length > 0 ? label : getFieldLabelByKey(key);

export const getCheckoutFieldLabel = ({ label, name }) => label
&& label.length > 0 ? label : getFieldLabelByKey(name);
