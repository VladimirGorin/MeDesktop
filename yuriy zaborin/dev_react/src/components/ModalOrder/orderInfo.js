// eslint-disable-line
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ItemImage } from '../../components';
import { themeSettings } from '../../lib/settings';
import * as helper from '../../lib/helper';
import { Quantity } from '../ProductDetails/quantity';

const SummaryItem = (props) => {
    const { settings, item, quantity, shippingMethod, currentLang, setItemQuantity } = props;
    const shipping_total = settings.shippingMethodPrice[ shippingMethod ];
    const total = item.price_local * quantity;
    const [ shippingTotal, setShippingTotal ] = useState(shipping_total);
    const [ grandTotal, setGrandTotal ] = useState(total + shipping_total);
    const placeholderHeight = 100;
    const imageSize = themeSettings.listThumbnailWidth;

    useEffect(() => {
        const shipping_total = settings.shippingMethodPrice[ shippingMethod ];
        setShippingTotal(shipping_total);
        setGrandTotal(total + shipping_total);
    }, [ shippingMethod, quantity ]);

    return (
        <div className = 'modal-order'>
            <div className = 'is-mobile columns'>
                <div className = 'column is-3'>
                    <div className = 'image'>
                        <NavLink to = { helper.getUrl(item.slug, item.id) } >
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
                        maxQuantity = { themeSettings.maxCartItemQty }
                        quantity = { quantity }
                        onChange = { setItemQuantity }
                    />
                </div>
                <div className = 'column is-3 has-text-right total-price'>
                    {helper.formatCurrency(total, settings)}
                </div>
            </div>
            <div className = 'is-mobile columns'>
                { shippingTotal ? (
                    <>
                        <div className = 'column is-4 has-text-left totals'>
                            <h3>{`${ window[ currentLang ].orderShipping }:`}</h3>
                        </div>
                        <div className = 'column is-2 has-text-left total-price totals'>
                            {helper.formatCurrency(shippingTotal, settings)}
                        </div>
                    </>
                ) : null }
                <div className = { `column is-${shippingTotal ? '3' : '9'} has-text-right totals` }>
                    <h3>{`${ window[ currentLang ].grandTotal }:`}</h3>
                </div>
                <div className = 'column is-3 has-text-right total-price totals'>
                    {helper.formatCurrency(grandTotal, settings)}
                </div>
            </div>
        </div>
    );
};

SummaryItem.propTypes = {
    settings: PropTypes.shape({}).isRequired,
    item:     PropTypes.shape({}).isRequired,
};

export const OrderInfo = (props) => {
    const { settings, product, quantity, shippingMethod, currentLang } = props;

    return (
        <div
            className = 'checkout-box content is-small'
            style = {{ paddingBottom: 0 }}>
            <SummaryItem
                { ...props }
                currentLang = { currentLang }
                item = { product }
                quantity = { quantity }
                settings = { settings }
                shippingMethod = { shippingMethod }
            />
        </div>
    );
};
