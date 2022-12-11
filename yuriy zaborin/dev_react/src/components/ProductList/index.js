// eslint-disable-line
import React, { Fragment } from 'react';
import { Item, LoadMore, CompareItem } from '../../components';

const ProductList = (props) => {
    const {
        products,
        addToCart,
        settings,
        loadMoreProducts,
        hasMore,
        loadingProducts,
        loadingMoreProducts,
        isCentered,
        className = 'columns is-mobile products',
        columnCountOnMobile,
        columnCountOnTablet,
        columnCountOnDesktop,
        columnCountOnWidescreen,
        columnCountOnFullhd,
        currentLang,
        isCompare,
        isManager,
        fixedRowCount,
    } = props;
    const items = products && products.length > 0
        ? products.map((product) => isCompare ? (
            <CompareItem
                { ...props }
                addToCart = { addToCart }
                columnCountOnDesktop = { columnCountOnDesktop }
                columnCountOnFullhd = { columnCountOnFullhd }
                columnCountOnMobile = { columnCountOnMobile }
                columnCountOnTablet = { columnCountOnTablet }
                columnCountOnWidescreen = { columnCountOnWidescreen }
                key = { product.id }
                product = { product }
                settings = { settings }
            />
        ) : (
            <Item
                { ...props }
                addToCart = { addToCart }
                columnCountOnDesktop = { columnCountOnDesktop }
                columnCountOnFullhd = { isManager && !fixedRowCount ? 3 : columnCountOnFullhd }
                columnCountOnMobile = { columnCountOnMobile }
                columnCountOnTablet = { columnCountOnTablet }
                columnCountOnWidescreen = { columnCountOnWidescreen }
                key = { product.id }
                product = { product }
                settings = { settings }
            />
        ))
        : (
            <div className = 'no-items'>
                { window[ currentLang ].list_empty }
            </div>
        );

    return (
        <Fragment>
            <div
                className = {
                    className + (loadingProducts ? ' loading ' : '')
                    + (isCentered ? ' is-centered ' : '')
                    + (!isCompare ? ' is-multiline ' : '')
                }>
                {items}
            </div>
            <div className = 'load-more'>
                <LoadMore
                    hasMore = { hasMore }
                    loadMoreProducts = { loadMoreProducts }
                    loading = { loadingMoreProducts }
                    textBtn = { window[ currentLang ].loadMoreProducts }
                />
            </div>
        </Fragment>
    );
};

export { ProductList };
