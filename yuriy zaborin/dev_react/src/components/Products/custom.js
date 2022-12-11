// eslint-disable-line
import React, { useEffect, useState } from 'react';
import { api } from '../../Api';
import { ProductList } from '../../components';

export const CustomProducts  = (props) => {
    const { user, authorized, cashless } = props;
    const [ products, setProducts ] = useState([]);
    const [ go, setGo ] = useState(false);

    const params = {
        limit:    8,
        ids:      props.ids || [],
        sort:     'id',
        order:    -1,
        required: 'image',
        cashless: cashless,
    };

    useEffect(() => {
        const getProductsList = async (params, user, authorized) => {
            const data = await api.getProductsList(params, user, authorized);
            if (data && data.products) {
                setProducts(data.products);
                setGo(true);
            }
        };
        if (props.list && props.list.length > 0) {
            setProducts(props.list);
            setGo(true);
        } else {
            getProductsList(params, user, authorized);
        }
    }, [ cashless ]);

    const {
        settings,
        addToCart,
        isCentered,
        className,
        columnCountOnMobile,
        columnCountOnTablet,
        columnCountOnDesktop,
        columnCountOnWidescreen,
        columnCountOnFullhd,
    } = props;

    return (
        go ? (
            <ProductList
                { ...props }
                fixedRowCount
                addToCart = { addToCart }
                className = { className }
                columnCountOnDesktop = { columnCountOnDesktop }
                columnCountOnFullhd = { columnCountOnFullhd }
                columnCountOnMobile = { columnCountOnMobile }
                columnCountOnTablet = { columnCountOnTablet }
                columnCountOnWidescreen = { columnCountOnWidescreen }
                hasMore = { false }
                isCentered = { isCentered }
                loadMoreProducts = { null }
                products = { products }
                settings = { settings }
            />
        ) : null
    );
};
