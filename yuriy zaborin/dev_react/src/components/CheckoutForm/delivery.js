// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import { InputField } from './inputField';
import { RadioButton } from './RadioButton';
import { NpFields } from './npFields';

export const CheckoutDelivery = (props) => {
    const { config, isCargo, onClick, hidden, userData, currentLang }  = props;
    const [ NpDeliveryBranch, setNpDeliveryBranch ] = useState(false);
    const [ NpDeliveryCourier, setNpDeliveryCourier ] = useState(false);
    const [ NpDeliveryMiniBranch, setNpDeliveryMiniBranch ] = useState(false);
    const showPickup = true;

    useEffect(() => {
        setNpDeliveryMiniBranch(false);
        if (!isCargo && config.NpDeliveryMiniBranch) {
            setNpDeliveryMiniBranch(true);
        }
        if (config.NpDeliveryCourier) {
            setNpDeliveryCourier(true);
        }
        if (config.NpDeliveryBranch) {
            setNpDeliveryBranch(true);
        }
    }, [ isCargo ]);

    return (
        <>
            <h2>{window[ currentLang ].shippingMethods}</h2>
            { showPickup ? (
                <Field
                    className = 'checkout-field shipping-method'
                    component = { RadioButton }
                    id = 'pickup.pickup'
                    label = { window[ currentLang ].fullShippingMethod_pickup }
                    name = 'shippingMethod'
                    value = 'pickup.pickup'
                    onClick = { onClick }
                />
            ) : null }
            <Field
                className = 'checkout-field shipping-method'
                component = { RadioButton }
                id = 'citylink.citylink'
                label = { window[ currentLang ].fullShippingMethod_citylink }
                name = 'shippingMethod'
                value = 'citylink.citylink'
                onClick = { onClick }
            />
            <Field
                className = { hidden === 'citylink.citylink' ? 'checkout-field' : 'checkout-field  hidden' }
                component = { InputField }
                id = 'address_1'
                label = { window[ currentLang ].shippingAddress }
                name = 'address_1'
                user_data = { userData }
            />
            { NpDeliveryBranch ? (
                <Field
                    className = 'checkout-field shipping-method'
                    component = { RadioButton }
                    id = 'free.free'
                    label = { window[ currentLang ].fullShippingMethod_free }
                    name = 'shippingMethod'
                    value = 'free.free'
                    onClick = { onClick }
                />
            ) : null}
            { hidden === 'free.free' ? (
                <NpFields { ...props } />
            ) : null}
            { NpDeliveryCourier ? (
                <Field
                    className = 'checkout-field shipping-method'
                    component = { RadioButton }
                    id = 'free.courier'
                    label = { window[ currentLang ].fullShippingMethod_courier }
                    name = 'shippingMethod'
                    value = 'free.courier'
                    onClick = { onClick }
                />
            ) : null}
            { hidden === 'free.courier' ? (
                <NpFields
                    courier
                    { ...props }
                />
            ) : null}
            { NpDeliveryMiniBranch ? (
                <Field
                    className = 'checkout-field shipping-method'
                    component = { RadioButton }
                    id = 'free.mini'
                    label = { window[ currentLang ].fullShippingMethod_mini }
                    name = 'shippingMethod'
                    value = 'free.mini'
                    onClick = { onClick }
                />
            ) : null}
            { hidden === 'free.mini' ? (
                <NpFields { ...props } />
            ) : null}
        </>
    );
};
