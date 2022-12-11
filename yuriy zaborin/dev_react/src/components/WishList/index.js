// eslint-disable-line
import React, { useEffect, useState } from 'react';
import { api } from '../../Api';
import { ProductList } from '../../components';

export const WishList = (props) => {
    const {
        isCentered, className, wishListCount, cashless,
        wishList, addToCart, settings, user, authorized, currentLang,
    } = props;
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const ids = wishList  ? wishList : [];
        const params = {
            ids:      ids,
            sort:     'id',
            cashless: cashless,
        };
        const getProductsList = async (params, user, authorized) => {
            const data = await api.getProductsList(params, user, authorized);
            if (data && data.products) {
                setProducts(data.products);
            }
        };
        if (ids.length > 0) {
            getProductsList(params, user, authorized);
        }
    }, [ wishListCount ]);


    const productsJSX = products.length > 0  && wishListCount > 0 ? (
        <ProductList
            { ...props }
            addToCart = { addToCart }
            className = { className }
            columnCountOnDesktop = { 4 }
            columnCountOnFullhd = { 4 }
            columnCountOnMobile = { 1 }
            columnCountOnTablet = { 2 }
            columnCountOnWidescreen = { 2 }
            hasMore = { false }
            isCentered = { isCentered }
            loadMoreProducts = { null }
            products = { products }
            settings = { settings }
        />

    ) : null;


    return (

        <div className = 'container wish_list'>
            <div className = 'title is-4 has-text-centered'>{window[ currentLang ].wishList }</div>
            <div className = 'columns'>

                {productsJSX}
            </div>
        </div>
    );
};
