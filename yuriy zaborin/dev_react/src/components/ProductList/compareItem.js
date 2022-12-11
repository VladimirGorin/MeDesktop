// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import { ItemTags, ItemImage, ItemPrice, AddToCartButton, AddToWishListButton, Attributes, OneClickButton, AddToCompareButton } from '..';
import * as helper from '../../lib/helper';


const CompareItem = (props) => {
    const {
        product,
        addToCart,
        settings,
        columnCountOnMobile = 2,
        columnCountOnTablet = 3,
        columnCountOnDesktop = 4,
        columnCountOnWidescreen = 4,
        columnCountOnFullhd = 4,
        addToCompare,
        attributes,
        currentLang,
        authorized,
        addToWishList,
        setModalLoginIsOpen,
    } = props;
    const columnCount = 12;

    const columnSizeOnMobile = columnCount / columnCountOnMobile;
    const columnSizeOnTablet = columnCount / columnCountOnTablet;
    const columnSizeOnDesktop = columnCount / columnCountOnDesktop;
    const columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
    const columnSizeOnFullhd = columnCount / columnCountOnFullhd;

    const placeholderHeight = themeSettings.list_image_max_height
        && themeSettings.list_image_max_height > 0
        ? themeSettings.list_image_max_height
        : 200;

    const imageSize = props.size ? props.size : themeSettings.listThumbnailWidth;

    const productAttributes = () => {
        let result = [];
        if (attributes) {
            attributes.forEach((attribute) => {
                let find = false;
                if (product.attributes) {
                    product.attributes.forEach((productAttribute) => {
                        if (attribute === productAttribute.option) {
                            result.push(productAttribute);
                            find = true;
                        }
                    });
                }
                if (!find) {
                    result.push({
                        option: attribute,
                        name:   '',
                    });
                }
            });

            result.sort();
        }

        return result;
    };

    return (
        <div
            className = { `column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${text.stock_status_code[ product.stock_status_id ]
            }` }>
            <div className = 'product-wrap'>
                <div className = 'product-top'>
                    {product.sale && product.stock_status_id > 5 ? (
                        <div className = 'sale_label'>{window[ currentLang ].best_price}</div>
                    ) : null}
                    <NavLink to = { helper.getUrl(product.slug, product.id) }>
                        <figure
                            className = 'image'>
                            <ItemTags tags = { product.tags } />
                            <ItemImage
                                height = { placeholderHeight }
                                image = { product.image }
                                productName = { product.name }
                                size = { imageSize }
                            />
                        </figure>
                        <div
                            className = 'product-name'>
                            {product.name}
                        </div>
                    </NavLink>
                    <div className = 'content product-caption'>
                        <div className = 'product-code'>{window[ currentLang ].model} <span>{helper.refProductCode(product)}</span></div>
                        <ItemPrice
                            { ...props }
                            product = { product }
                            settings = { settings }
                        />
                    </div>
                    <div className = 'button-addtocart'>
                        <OneClickButton
                            { ...props }
                            isCompare
                            product = { product }
                            quantity = { 1 }
                        />
                        <AddToCartButton
                            { ...props }
                            isCompare
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
                        <AddToCompareButton
                            { ...props }
                            isCompare
                            addToCompare = { addToCompare }
                            product = { product }
                        />
                    </div>
                </div>
                <div className = 'item-attributes' >
                    <Attributes
                        { ...props }
                        isCompare
                        attributes = { productAttributes() }
                    />
                </div>
            </div>
        </div>
    );
};

export { CompareItem };
