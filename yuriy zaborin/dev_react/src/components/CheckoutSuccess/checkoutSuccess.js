// eslint-disable-line
import React from 'react';
import * as helper from '../../lib/helper';

const OrderFieldDiv = ({ label, value }) => (
    <div className = 'shipping-field'>
        <label>{label}: </label>
        {value}
    </div>
);

const OrderItem = ({ item, settings }) => (
    <div className = 'columns is-mobile is-gapless checkout-success-row'>
        <div className = 'column is-6'>
            {item.name}
        </div>
        <div className = 'column is-2 has-text-right'>
            {helper.formatCurrency(item.price_local, settings)}
        </div>
        <div className = 'column is-2 has-text-centered'>{item.quantity}</div>
        <div className = 'column is-2 has-text-right'>
            {helper.formatCurrency(item.price_local * item.quantity, settings)}
        </div>
    </div>
);

const OrderItems = ({ items, settings }) => {
    if (items && items.length > 0) {
        const rows = items.map((item) => (
            <OrderItem
                item = { item }
                key = { item.id }
                settings = { settings }
            />
        ));

        return <div>{rows}</div>;
    }

    return null;
};

const getSubData = (currentLang, checkoutFields) => {
    if (checkoutFields.shippingMethod === 'free.free') {
        const row = (
            <>
                <OrderFieldDiv
                    label = { window[ currentLang ].city }
                    value = { checkoutFields.city }
                />
                <OrderFieldDiv
                    label = { window[ currentLang ].shippingNpOffice }
                    value = { checkoutFields.npOffice }
                />
            </>
        );

        return row;
    }
    if (checkoutFields.shippingMethod === 'citylink.citylink') {
        const row = (
            <OrderFieldDiv
                label = { window[ currentLang ].shippingAddress }
                value = { checkoutFields.address_1 }
            />
        );

        return row;
    }

    return null;
};

export const CheckoutSuccess = (props) => {
    const { order, settings, currentLang } = props;
    const checkoutFields = order.checkout;

    if (order && order.cart && order.cart.items && order.cart.items.length > 0) {
        const shippingMethod = () => {
            let result = '';
            if (checkoutFields.shippingMethod) {
                const arr = checkoutFields.shippingMethod.split('.');
                if (arr && arr.length === 2) {
                    result = arr[ 1 ];
                }
            }

            return window[ currentLang ][ 'fullShippingMethod_' + result ] ? window[ currentLang ][ 'fullShippingMethod_' + result ] : order.shipping_method;
        };

        return (
            <div className = 'checkout-success-details'>
                <h1 className = 'checkout-success-title'>
                    <img
                        alt = ''
                        src = '/assets/images/success.svg'
                    />
                    <br />
                    {window[ currentLang ].checkoutSuccessTitle}
                </h1>

                <hr />

                <div
                    className = 'columns'
                    style = {{ marginBottom: '3rem' }}>
                    <div className = 'column is-6'>
                        <b>{window[ currentLang ].customerDetails}</b>
                        <OrderFieldDiv
                            label = { window[ currentLang ].first_name }
                            value = { checkoutFields.firstName }
                        />
                        <OrderFieldDiv
                            label = { window[ currentLang ].last_name }
                            value = { checkoutFields.lastName }
                        />
                        <OrderFieldDiv
                            label = { window[ currentLang ].email }
                            value = { checkoutFields.email }
                        />
                        <OrderFieldDiv
                            label = { window[ currentLang ].mobile }
                            value = { checkoutFields.mobile }
                        />
                    </div>

                    <div className = 'column is-6'>
                        <b>{window[ currentLang ].orderNumber}</b>: {order.number}
                        <br />
                        <b>{window[ currentLang ].shippingMethod}</b>: {  shippingMethod() }
                        { getSubData(currentLang, checkoutFields) }
                        <br />
                        <b>{window[ currentLang ].paymentMethod}</b>: { window[ currentLang ][ 'fullPaymentMethod_' + checkoutFields.paymentMethod ] }
                        <br />
                    </div>
                </div>

                <div className = 'columns is-mobile is-gapless checkout-success-row'>
                    <div className = 'column is-6'>
                        <b>{window[ currentLang ].productName}</b>
                    </div>
                    <div className = 'column is-2 has-text-right'>
                        <b>{window[ currentLang ].price}</b>
                    </div>
                    <div className = 'column is-2 has-text-centered'>
                        <b>{window[ currentLang ].qty}</b>
                    </div>
                    <div className = 'column is-2 has-text-right'>
                        <b>{window[ currentLang ].total}</b>
                    </div>
                </div>

                <OrderItems
                    items = { order.cart.items }
                    settings = { settings }
                />

                <div className = 'columns'>
                    <div className = 'column is-offset-7 checkout-success-totals'>
                        <div>
                            <b>{window[ currentLang ].grandTotal}:</b>
                            <b>{helper.formatCurrency(order.grandTotal, settings)}</b>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <div className = 'has-text-centered'>{window[ currentLang ].cartEmpty}</div>;
};
