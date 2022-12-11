// eslint-disable-line
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import { ItemTags, ItemImage, ItemPrice, AddToCartButton, AddToWishListButton, Attributes, OneClickButton, AddToCompareButton, Suppliers } from '../../components';
import { getQueryStringValue, getUrl, refProductCode } from '../../lib/helper';

const Item = (props) => {
    const {
        product,
        addToCart,
        settings,
        columnCountOnMobile = 2,
        columnCountOnTablet = 3,
        columnCountOnDesktop = 4,
        columnCountOnWidescreen = 4,
        columnCountOnFullhd = 4,
        showSuppliers,
        addToCompare,
        itemClassName,
        authorized,
        addToWishList,
        currentLang,
        setModalLoginIsOpen,
    } = props;
    const [ visible, setVisible ] = useState(false);
    const columnCount = 12;

    const columnSizeOnMobile = columnCount / columnCountOnMobile;
    const columnSizeOnTablet = columnCount / columnCountOnTablet;
    const columnSizeOnDesktop = columnCount / columnCountOnDesktop;
    const columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
    const columnSizeOnFullhd = columnCount / columnCountOnFullhd;
    const searchWord = getQueryStringValue('s');
    const regex = searchWord ? new RegExp('(' + searchWord + ')', 'i') : null;
    const imageHeight = themeSettings.list_image_max_height
&& themeSettings.list_image_max_height > 0
        ? themeSettings.list_image_max_height
        : 'auto';
    const placeholderHeight = themeSettings.list_image_max_height
&& themeSettings.list_image_max_height > 0
        ? themeSettings.list_image_max_height
        : 200;

    const info = currentLang === 'ru' && product.attributes && product.attributes.length > 0 ? (
        <div
            className = 'info'
            onClick = { () => { setVisible(!visible); } }>
            i
        </div>
    ) : null;

    const imageSize = props.size ? props.size : themeSettings.listThumbnailWidth;

    const suppliersJSX = showSuppliers && product.suppliers && product.suppliers.length > 0 ? (
        <Suppliers
            { ...props }
            product = { product }
        />
    ) : null;

    const optPricesJSX = showSuppliers && product.opt_prices ? (
        <table className = 'suppliers'>
            <tbody>
                { product.opt_prices.cashless ? (
                    <tr
                        className = 'supplier'>
                        <td>{ `${ window[ currentLang ].cashless } (${product.opt_prices.cashless.count})` }</td>
                        <td>${ product.opt_prices.cashless.price }</td>
                    </tr>
                ) : null }
                { product.opt_prices.cash ? (
                    <tr
                        className = 'supplier'>
                        <td>{ `${ window[ currentLang ].cash } (${product.opt_prices.cash.count})` }</td>
                        <td>${ product.opt_prices.cash.price }</td>
                    </tr>
                ) : null }
            </tbody>
        </table>
    ) : null;

    const itemClass = itemClassName ? itemClassName : `column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd`;

    const getProductName = (product) => {
        const result = currentLang === 'ua' && product.name_ua ? product.name_ua : product.name;

        return regex ? result.replace(regex, '<span class = "selected">$1</span>') : result;
    };

    return (
        <div
            className = { `${itemClass} ${text.stock_status_code[ product.stock_status_id ]}` }>
            <div className = 'product-wrap'>
                { info }
                { (product.sale && product.stock_status_id > 5) || product.upc === '1' ? (
                    <div className = 'sale_label'>{ window[ currentLang ].best_price }</div>
                ) : null}
                { product.action ? (
                    <div className = 'sale_label'>{ window[ currentLang ].action }</div>
                ) : null}
                <NavLink to = { getUrl(product.slug, product.id) }>
                    <figure
                        className = 'image'
                        style = {{ height: imageHeight }}>
                        <ItemTags tags = { product.tags } />
                        <ItemImage
                            height = { placeholderHeight }
                            image = { product.image }
                            productName = { product.name }
                            size = { imageSize }
                        />
                    </figure>
                </NavLink>
                { suppliersJSX }
                { optPricesJSX }
                <div className = 'content product-caption'>
                    <div className = 'product-action'>{ `${ product.action ? product.action : '' }` }</div>
                    <NavLink
                        className = 'product-name'
                        dangerouslySetInnerHTML = {
                            { __html: getProductName(product) }
                        }
                        to = { getUrl(product.slug, product.id) }
                    />
                    <div className = 'codes'>
                        <div className = 'product-code'>{window[ currentLang ].model}
                            <span
                                dangerouslySetInnerHTML = {
                                    { __html: regex ? refProductCode(product).toString().replace(regex, '<span class = "selected">$1</span>') : refProductCode(product) }
                                }
                            />
                        </div>
                        <div className = 'product-model'>{window[ currentLang ].pn}
                            <span
                                dangerouslySetInnerHTML = {
                                    { __html: regex ? product.model.replace(regex, '<span class = "selected">$1</span>') : product.model }
                                }
                            />
                        </div>
                    </div>
                    <ItemPrice
                        { ...props }
                        product = { product }
                        settings = { settings }
                    />
                </div>
                <div className = 'button-addtocart'>
                    <AddToCartButton
                        { ...props }
                        addToCart = { addToCart }
                        product = { product }
                    />
                    <AddToWishListButton
                        { ...props }
                        addToWishList = { addToWishList }
                        authorized = { authorized }
                        product = { product }
                        setModalLoginIsOpen = { setModalLoginIsOpen }
                    />
                    { currentLang === 'ru' ? (
                        <AddToCompareButton
                            { ...props }
                            addToCompare = { addToCompare }
                            product = { product }
                        />
                    ) : null }
                </div>
                <div className = 'button-addtocart'>
                    <OneClickButton
                        { ...props }
                        product = { product }
                        quantity = { 1 }
                    />
                </div>
                <div className = { `item-attributes ${ visible ? 'open' : '' }` } >
                    <Attributes
                        { ...props }
                        attributes = { product.attributes }
                    />
                </div>
            </div>
        </div>
    );
};

export { Item };
