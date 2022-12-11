// eslint-disable-line
import React, { useEffect, useState } from 'react';
import { CheckoutSuccess } from './checkoutSuccess';

export const CheckoutSuccessContainer = (props) => {
    const [ order, setOrder ] = useState({});

    const getArrayFromLocalStorage = () => {
        let values = {};
        const data = localStorage.getItem('order');
        try {
            const cartString  = decodeURIComponent(atob(data));
            if (cartString && cartString.length > 0) {
                const cartParsed = JSON.parse(cartString);
                if (cartParsed) {
                    values = cartParsed;
                }
            }
        } catch (error) {
            //
        }

        return values;
    };

    useEffect(() => {
        const newOrder = getArrayFromLocalStorage();
        if (newOrder && newOrder.cart && newOrder.cart.items && newOrder.cart.items.length > 0) {
            setOrder(newOrder);
            localStorage.setItem('order', null);
        }
    }, [ ]);


    return (
        <section className = 'section section-checkout'>
            <div className = 'container'>
                <div className = 'columns content'>
                    <div className = 'column is-8 is-offset-2'>
                        <div className = 'checkout-box'>
                            <CheckoutSuccess
                                { ...props }
                                order = { order }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
