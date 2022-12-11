// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings } from '../../lib/settings';
import { ItemImage } from '../../components';
import { Quantity } from '../ProductDetails/quantity';

import * as helper from '../../lib/helper';

const CartItem = (props) => {
    const { item, deleteCartItem, settings, updateCartItemQuantity, currentLang } = props;
    const placeholderHeight = 100;

    const imageSize = themeSettings.listThumbnailWidth;

    const maxQty = themeSettings.maxCartItemQty;

    const setItemQuantity = (value) => {
        updateCartItemQuantity(item, value);
    };

    return (
        <div className = 'columns is-mobile'>
            <div className = 'column is-2'>
                <div className = 'image'>
                    <NavLink to = { helper.getUrl(item.slug, item.id) }>
                        <figure
                            className = 'image'>
                            <ItemImage
                                height = { placeholderHeight }
                                image = { item.image }
                                productName = { item.name }
                                size = { imageSize }
                            />
                        </figure>
                    </NavLink>
                </div>
            </div>
            <div className = 'column'>
                <div>
                    <NavLink to = { helper.getUrl(item.slug, item.id) }>{item.name}</NavLink>
                </div>
                {item.model && item.model.length > 0 && (
                    <div className = 'cart-option-name'>{item.model}</div>
                )}
                {item.jan && (
                    <div>{ window[ currentLang ].menu_warranty } {helper.getWarranty(item.jan, currentLang)}</div>
                )}
                <div className = 'cart-quantity'>
                    <Quantity
                        { ...props }
                        maxQuantity = { maxQty }
                        quantity = { item.quantity }
                        onChange = { setItemQuantity }
                    />
                </div>
            </div>
            <div className = 'column is-4 has-text-right'>
                <div className = 'mini-cart-item-price'>
                    {helper.formatCurrency(item.price_local * item.quantity, settings)}
                </div>
                <span
                    className = 'button is-light is-small'
                    onClick = { () => deleteCartItem(item.id) }>
                    {window[ currentLang ].remove}
                </span>
            </div>
        </div>
    );
};

export const Cart  = (props) => {
    const { cart, deleteCartItem, settings, cartToggle, cartIsActive, currentLang } = props;

    if (cart && cart.items && cart.items.length > 0) {
        const items = cartIsActive ? cart.items.map((item) => (
            <CartItem
                { ...props }
                deleteCartItem = { deleteCartItem }
                item = { item }
                key = { item.id }
                settings = { settings }
            />
        )) : null;

        return (
            <div className = 'mini-cart'>
                <div className = 'mini-cart-wrap'>
                    {items}
                </div>
                <hr className = 'separator' />
                <div className = 'columns is-mobile is-gapless'>
                    <div className = 'column is-7'>
                        <b>{window[ currentLang ].subtotal}</b>
                    </div>
                    <div className = 'column is-5 has-text-right'>
                        <b>{helper.formatCurrency(cart.subtotal, settings)}</b>
                    </div>
                </div>
                <NavLink
                    className = 'button is-primary is-fullwidth has-text-centered'
                    style = {{ textTransform: 'uppercase' }}
                    to =  { helper.getUrl('checkout', null) }
                    onClick = { () => cartToggle() }>
                    {window[ currentLang ].proceedToCheckout}
                </NavLink>
            </div>
        );
    }

    return (
        <div className = 'mini-cart'>
            <p>{window[ currentLang ].cartEmpty}</p>
        </div>
    );
};
