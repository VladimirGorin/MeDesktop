// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { api } from '../../Api';
import moment from 'moment';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

export const AccountOrderDetails = (props) => {
    const { currentLang, settings } = props;
    const [ order, setOrder ] = useState({});
    const [ showOrder, setShowOrder ] = useState(false);

    const order_id = props.match.params.order_id || 0;

    const getAccountOrderDetails = async (order_id) => {
        const data = await api.getAccountOrderDetails(order_id);
        if (data && data.order) {
            setOrder(data.order);
            setShowOrder(true);
        }
    };

    useEffect(() => {
        getAccountOrderDetails(order_id);
    }, [  ]);

    const products = order && order.products && order.products.length > 0
        ? order.products.map((product, index) => (
            <div
                className = 'product_item'
                key = { index }>
                <div className = 'el double'>
                    {currentLang === 'ua' && product.name_ua ? product.name_ua : product.name}
                </div>
                <div className = 'el'>
                    {product.model}
                </div>
                <div className = 'el'>
                    {product.quantity}
                </div>
                <div className = 'el'>
                    <FormattedCurrency
                        number = { product.price }
                        settings = { settings }
                    />
                </div>
                <div className = 'el'>
                    <FormattedCurrency
                        number = { product.total }
                        settings = { settings }
                    />
                </div>
            </div>
        ))
        : null;

    const totals = order && order.totals && order.totals.length > 0
        ? order.totals.map((total, index) => (
            <div
                className = 'product_item'
                key = { index }>
                <div className = 'el total_double'>
                    { window[ currentLang ][ 'order_total_' + total.code ]}
                </div>
                <div className = 'el'>
                    <FormattedCurrency
                        number = { total.value }
                        settings = { settings }
                    />
                </div>
            </div>
        ))
        : null;

    const shippingMethod = (order) => {
        let result = order && order.shipping_method ? order.shipping_method : '';
        if (order && order.shipping_code) {
            const arr = order.shipping_code.split('.');
            if (arr && arr.length === 2) {
                result = arr[ 1 ];
            }
        }

        return window[ currentLang ][ 'fullShippingMethod_' + result ] ? window[ currentLang ][ 'fullShippingMethod_' + result ] : order.shipping_method;
    };


    const orderJSX = showOrder ? (
        <>
            <div className = 'order_block'>
                <h3>{window[ currentLang ].order_details}</h3>
                <div className = 'columns'>
                    <div className = 'column is-6'>
                        <div>
                            <b>{ window[ currentLang ].order_id }</b> { order.order_id }
                        </div>
                        <div>
                            <b>{ window[ currentLang ].order_date }</b> { moment(order.createdAt).format('DD.MM.YYYY') }
                        </div>
                    </div>
                    <div className = 'column is-6'>
                        <div>
                            <b>{ window[ currentLang ].order_payment }</b> { window[ currentLang ][ 'fullPaymentMethod_' + order.payment_code ] }
                        </div>
                        <div>
                            <b>{ window[ currentLang ].order_shipping }</b> { shippingMethod(order) }
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'order_block'>
                <div className = 'columns'>
                    <div className = 'column is-6'>
                        <div>
                            <b>{ window[ currentLang ].order_payment_address }</b>
                        </div>
                        <div>
                            { order.payment_client }<br/>
                            { order.payment_address ? order.payment_address : null }
                            { order.payment_address ? <br/> : null }
                            { order.payment_city ? order.payment_city : null }
                            { order.payment_city ? <br/> : null }
                            { order.payment_zone }<br/>
                            { order.payment_country }
                        </div>
                    </div>
                    <div className = 'column is-6'>
                        <div>
                            <b>{ window[ currentLang ].order_shipping_address }</b>
                        </div>
                        <div>
                            { order.shipping_client }<br/>
                            { order.shipping_address ? order.shipping_address : null }
                            { order.shipping_address ? <br/> : null }
                            { order.shipping_city ? order.shipping_city : null }
                            { order.shipping_city ? <br/> : null }
                            { order.shipping_zone }<br/>
                            { order.shipping_country }
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'order_products_block'>
                <div className = 'columns'>
                    <div className = 'column is-12'>
                        <div
                            className = 'product_item product_title'>
                            <div className = 'el double'>
                                {window[ currentLang ].order_product_name}
                            </div>
                            <div className = 'el'>
                                {window[ currentLang ].order_product_model}
                            </div>
                            <div className = 'el'>
                                {window[ currentLang ].order_product_quantity}
                            </div>
                            <div className = 'el'>
                                {window[ currentLang ].order_product_price}
                            </div>
                            <div className = 'el'>
                                {window[ currentLang ].order_product_total}
                            </div>
                        </div>
                        { products }
                        { totals }
                    </div>
                </div>
            </div>
        </>
    ) : null;

    return (
        <>
            <h1>{window[ currentLang ].order}</h1>
            { orderJSX }
        </>
    );
};
