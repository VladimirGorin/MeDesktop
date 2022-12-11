// eslint-disable-line
/* eslint-disable no-extra-parens */
import React from 'react';
import { themeSettings } from '../../lib/settings';

const AddToCartButton = ({
    addToCart,
    product,
    quantity = 1,
    currentLang,
    isCompare,
}) => {
    const buttonStyle = {};
    if (
        themeSettings.button_addtocart_bg && themeSettings.button_addtocart_bg.length > 0
    ) {
        buttonStyle.backgroundColor = themeSettings.button_addtocart_bg;
    }
    if (
        themeSettings.button_addtocart_color && themeSettings.button_addtocart_color.length > 0
    ) {
        buttonStyle.color = themeSettings.button_addtocart_color;
    }

    const addToCartText = window[ currentLang ].addToCart;
    let disabled = '';
    if (product.stock_status_id === 5) {
        disabled = 'disabled';
    }
    if (product.stock_status_id === 7 || product.stock_status_id === 6 || (isCompare && product.stock_status_id === 5)) {
        return (
            <button
                className = 'button addtocart'
                disabled = { disabled }
                style = { buttonStyle }
                onClick = { () => { addToCart(product, quantity); } }>
                {addToCartText}
            </button>
        );
    }

    return null;
};

export { AddToCartButton };
