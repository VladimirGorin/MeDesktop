// eslint-disable-line
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ReactGA from 'react-ga';
import { OrderInfo } from './orderInfo';
import { OrderContacts } from './orderContacts';
import { api } from '../../Api';


Modal.setAppElement('#modal');

export const ModalOrder = (props) => {
    const { closeModal, modalIsOpen, product, quantity, currentLang, rate, settings, categories } = props;
    const [ showConfirm, setShowConfirm ] = useState(false);
    const [ orderQuantity, setOrderQuantity ] = useState(quantity);
    const [ orderId, setOrderId ] = useState(0);
    const [ shippingMethod, setShippingMethod ] = useState('pickup.pickup');
    const [ isCargo, setIsCargo ] = useState(false);

    const virtualPage = () => {
        const pageView = '/oneclick/';
        ReactGA.pageview(pageView);
    };

    const setItemQuantity = (value) => {
        setOrderQuantity(value);
    };

    useEffect(() => {
        let isCargo = false;
        let totalWeigth = 0;
        if (product.category_id && categories) {
            const category = categories.find((el)=>el.id === product.category_id);
            if (category && category.isCargo) {
                isCargo = true;
            }
            if (category && category.tw && category.tw > 0) {
                totalWeigth += category.tw * orderQuantity;
            }
        }
        if (totalWeigth > 30) {
            isCargo = true;
        }
        setIsCargo(isCargo);
    }, [ product, orderQuantity ]);

    const createOneClickOrder = (values) => {
        if (product && values) {
            const total = product.price_local * orderQuantity;
            const shipping_total = settings.shippingMethodPrice[ values.shippingMethod ];
            const grandTotal = total + shipping_total;
            const grandTotalUsd = grandTotal / rate;
            const cart = {
                items:           [],
                subtotal:        grandTotal,
                shipping_total:  shipping_total,
                grand_total:     grandTotal,
                grand_total_usd: grandTotalUsd,
            };
            cart.items.push({
                id:          product.id,
                image:       product.image,
                slug:        product.slug,
                name:        product.name,
                model:       product.model,
                quantity:    orderQuantity,
                price:       product.price,
                price_local: product.price_local,
                useMP:       product.useMP,
                useVi:       !!product.useVi,
                useViRRC:    !!product.useViRRC,
                jan:         product.jan,
            });
            const order = {
                cart:          cart,
                checkout:      values,
                number:        0,
                shippingPrice: shipping_total,
                grandTotal:    grandTotal,
                grandTotalUsd: grandTotalUsd,
                oneClick:      true,
                rate:          rate,
            };
            const createNewOrder = async (order) => {
                const result = await api.createOrder(order);
                if (result && result.order_id) {
                    setOrderId(result.order_id);
                    setShowConfirm(true);
                }
            };
            virtualPage();
            createNewOrder(order);
        }
    };

    const content = showConfirm ? (
        <div className = 'checkout-success-details'>
            <h2 className = 'checkout-success-title'>
                <img
                    alt = ''
                    src = '/assets/images/success.svg'
                />
                <br />
                {window[ currentLang ].checkoutSuccessTitle}
            </h2>
            <hr />
            <div className = 'column is-12 text-center'>
                <b>{window[ currentLang ].orderNumber}</b>: {orderId}
            </div>
        </div>
    ) : (
        <>
            <div className = 'column is-12-widescreen is-12-desktop orderInfo'>
                <OrderInfo
                    { ...props }
                    quantity = { orderQuantity }
                    setItemQuantity = { setItemQuantity }
                    shippingMethod = { shippingMethod }
                />
            </div>
            <div className = 'column is-12-widescreen is-12-desktop orderContacts'>
                <OrderContacts
                    { ...props }
                    createOneClickOrder = { createOneClickOrder }
                    isCargo = { isCargo }
                    setShippingMethod = { setShippingMethod }
                    shippingMethod = { shippingMethod }
                />
            </div>
        </>
    );

    return (
        <Modal
            className = { `modalOrder ${showConfirm ? '' : 'fullHightModal'}` }
            contentLabel = 'Example Modal'
            isOpen = { modalIsOpen }
            overlayClassName = 'Overlay'
            onRequestClose = { () => closeModal() }>
            <div className = 'modalContainer fullHight'>
                <span
                    className = 'close'
                    onClick = { () => closeModal() }
                />
                <div className = 'columns fullHight'>
                    { content }
                </div>
            </div>
        </Modal>
    );
};
