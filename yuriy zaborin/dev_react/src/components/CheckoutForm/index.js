// eslint-disable-line
import React from 'react';
import { CheckoutStepContacts } from './stepContacts';

export const CheckoutForm = (props) => {
    const { cart, currentLang } = props;

    if (cart && cart.items.length > 0) {
        return (
            <div className = 'checkout-form'>
                <CheckoutStepContacts { ...props } />
            </div>
        );
    }

    return <p>{window[ currentLang ].emptyCheckout}</p>;
};
