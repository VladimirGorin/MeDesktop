// eslint-disable-line
import React, { useEffect, useState } from 'react';
import { CheckoutForm, OrderSummary } from '../../components';

export const Checkout = (props) => {
    const defaultShippingMethod = 'pickup.pickup';
    const { updateCart, cartUpdatedProducts, categories } = props;
    const [ updatedCart, setUpdatedCart ] = useState(false);
    const [ showWaring, setShowWaring ] = useState(false);
    const [ mustDeleteItem, setMustDeleteItem ] = useState(false);
    const [ isCargo, setIsCargo ] = useState(false);
    const [ paymentMethod, setPaymentMethod ] = useState('cod');
    const [ shippingMethod, setShippingMethod ] = useState(defaultShippingMethod);
    useEffect(() => {
        if (props.cart && props.cart.items && props.cart.items.length > 0 && !updatedCart) {
            updateCart();
            setUpdatedCart(true);
        }
        if (props.cart && props.cart.items && props.cart.items.length > 0 && updatedCart && Object.keys(cartUpdatedProducts).length > 0) {
            let cartIsOk = true;
            let wrongQlt = false;
            props.cart.items.forEach((element) => {
                if (cartUpdatedProducts[ element.id ]) {
                    cartIsOk = false;
                    if (cartUpdatedProducts[ element.id ].new_quantity === 0) {
                        wrongQlt = true;
                    }
                }
            });
            if (cartIsOk) {
                setMustDeleteItem(false);
                setShowWaring(false);
            } else {
                if (!wrongQlt && mustDeleteItem) {
                    setMustDeleteItem(false);
                }
                setShowWaring(true);
            }
        }
        if (props.cart && props.cart.items && props.cart.items.length > 0 && updatedCart && Object.keys(cartUpdatedProducts).length === 0) {
            setMustDeleteItem(false);
            setShowWaring(false);
        }
    }, [ props.cart.items.length, cartUpdatedProducts ]);

    useEffect(() => {
        if (props.cart && props.cart.items && props.cart.items.length > 0 && categories) {
            let isCargo = false;
            let totalWeigth = 0;
            for (const item of props.cart.items) {
                if (item.category_id) {
                    const category = categories.find((el)=>el.id === item.category_id);
                    if (category && category.isCargo) {
                        isCargo = true;
                    }
                    if (category && category.tw && category.tw > 0) {
                        totalWeigth += category.tw * item.quantity;
                    }
                }
            }
            if (totalWeigth > 30) {
                isCargo = true;
            }
            setIsCargo(isCargo);
        }
    }, [ props.cart.subtotal ]);

    return (
        <section className = 'section section-checkout'>
            <div className = 'container'>
                <div className = 'columns columns-checkout'>
                    <div className = 'column is-5-widescreen is-offset-1-widescreen is-6-desktop'>
                        <OrderSummary
                            mustDeleteItem = { mustDeleteItem }
                            paymentMethod = { paymentMethod }
                            setMustDeleteItem = { setMustDeleteItem }
                            setShowWaring = { setShowWaring }
                            shippingMethod = { shippingMethod }
                            showWaring = { showWaring }
                            updateCart = { updateCart }
                            { ...props }
                        />
                    </div>
                    <div className = 'column is-6-widescreen is-6-desktop'>
                        <CheckoutForm
                            isCargo = { isCargo }
                            mustDeleteItem = { mustDeleteItem }
                            paymentMethod = { paymentMethod }
                            setPaymentMethod = { setPaymentMethod }
                            setShippingMethod = { setShippingMethod }
                            shippingMethod = { shippingMethod }
                            { ...props }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
