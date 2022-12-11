// eslint-disable-line
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings } from '../../lib/settings';
import * as helper from '../../lib/helper';
import { Quantity } from '../ProductDetails/quantity';
import { ItemImage } from '../../components';


const SummaryItem = (props) => {
    const { settings, item, updateCartItemQuantity, newData, setMustDeleteItem, mustDeleteItem, paymentMethod, currentLang} = props;
    const placeholderHeight = 100;

    const setItemQuantity = (value) => {
        updateCartItemQuantity(item, value);
    };

    const imageSize = themeSettings.listThumbnailWidth;

    const priceClass = newData && newData.old_price !== newData.new_price ? 'warning_price' : '';
    const itemClass = newData && newData.new_quantity === 0 ? 'columns is-mobile warning_item' : 'columns is-mobile';
    const cashlessWarning = paymentMethod === 'cheque' && newData && newData.new_quantity === 0;

    const maxQty = newData && newData.new_quantity === 0 ? 0 : themeSettings.maxCartItemQty;

    if (maxQty === 0 && !mustDeleteItem) {
        setMustDeleteItem(true);
    }

    return (
        <>
            { cashlessWarning ? (
                <div className = 'cashlessWarning'>
                    { window[ currentLang ].cashlessWarning }
                </div>
            ) : null }
            <div className = { itemClass }>
                <div className = 'column is-3'>
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
                    {item.model.length > 0 && (
                        <div className = 'cart-option-name'>{item.model}</div>
                    )}
                    {item.jan && (
                        <div>{ window[ currentLang ].menu_warranty } {helper.getWarranty(item.jan, currentLang)}</div>
                    )}
                    <Quantity
                        { ...props }
                        maxQuantity = { maxQty }
                        quantity = { item.quantity }
                        onChange = { setItemQuantity }
                    />
                </div>
                <div className = 'column is-3 has-text-right price'>
                    <div className = { priceClass }>
                        {helper.formatCurrency(item.price_local * item.quantity, settings)}
                    </div>
                    <span
                        className = 'button is-light is-small'
                        onClick = { () => setItemQuantity(0) }>
                        {window[ currentLang ].remove}
                    </span>
                </div>
            </div>
        </>
    );
};

SummaryItem.propTypes = {
    settings:               PropTypes.shape({}).isRequired,
    item:                   PropTypes.shape({}).isRequired,
    updateCartItemQuantity: PropTypes.func.isRequired,
};

export const OrderSummary = (props) => {
    const { updateCartItemQuantity, cart, settings, shippingPrice, grandTotal, cartUpdatedProducts, mustDeleteItem, setMustDeleteItem,
        showWaring, paymentMethod, currentLang, shippingMethod } = props;

    if (cart && cart.items && cart.items.length > 0) {
        const items = cart.items.map((item) => (
            <SummaryItem
                currentLang = { currentLang }
                item = { item }
                key = { item.id }
                mustDeleteItem = { mustDeleteItem }
                newData = { cartUpdatedProducts && cartUpdatedProducts[ item.id ] ? cartUpdatedProducts[ item.id ] : null }
                paymentMethod = { paymentMethod }
                setMustDeleteItem = { setMustDeleteItem }
                settings = { settings }
                updateCartItemQuantity = { updateCartItemQuantity }
            />
        ));

        return (
            <div
                className = 'checkout-box content is-small'
                style = {{ paddingBottom: 0 }}>
                <div className = 'title is-4'>{window[ currentLang ].orderSummary}</div>
                { showWaring ? (
                    <div className = 'warning'>
                        {paymentMethod === 'cheque' ? window[ currentLang ].cartWarningCheque : window[ currentLang ].cartWarning}
                    </div>
                ) : null}
                { mustDeleteItem ? (
                    <div className = 'warning'>
                        {window[ currentLang ].mustDeleteItem}
                    </div>
                ) : null}
                <hr className = 'separator' />
                {items}
                <div className = 'columns is-mobile is-gapless is-multiline summary-block'>

                    <div className = 'column is-7'>{window[ currentLang ].subtotal}</div>
                    <div className = 'column is-5 has-text-right price'>
                        {helper.formatCurrency(cart.subtotal, settings)}
                    </div>
                    <div className = 'column is-7'>{window[ currentLang ].shipping}</div>
                    <div className = 'column is-5 has-text-right price'>
                        { shippingMethod.indexOf('free.') !== -1
                            ? window[ currentLang ].np_tarifs
                            :  helper.formatCurrency(shippingPrice, settings)
                        }
                    </div>

                    <div className = 'column is-12'>
                        <hr className = 'separator' />
                    </div>
                    <div className = 'column is-6 total-text'>{window[ currentLang ].grandTotal}</div>
                    <div className = 'column is-6 total-price'>
                        {helper.formatCurrency(grandTotal, settings)}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
