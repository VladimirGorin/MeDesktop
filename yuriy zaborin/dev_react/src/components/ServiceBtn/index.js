// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { ModalService } from '../../components';

export const ServiceBtn = (props) => {
    const { currentLang } = props;
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ orderInfo, setOrderInfo ] = useState(null);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        if (window.location.hash.indexOf('#request=') !== -1) {
            const orderInfo = window.location.hash.replace('#request=', '');
            if (orderInfo) {
                try {
                    const orderString = decodeURIComponent(atob(orderInfo));
                    const order = orderString ? JSON.parse(orderString) : null;
                    if (order) {
                        setOrderInfo(order);
                    }
                } catch (error) {
                    //console.log(error);
                }
            }
            setModalIsOpen(true);
        }
    }, [ window.location.hash ]);

    const clearForm = () => {
        setOrderInfo(null);
    };

    return (
        <>
            <button
                className = 'button servicebtn'
                title = { window[ currentLang ].serviceBtn }
                onClick = { () => { setModalIsOpen(!modalIsOpen); } }>
                {window[ currentLang ].serviceBtn}
            </button>
            { modalIsOpen ? (
                <ModalService
                    { ...props }
                    clearForm = { clearForm }
                    closeModal = { closeModal }
                    modalIsOpen = { modalIsOpen }
                    orderInfo = { orderInfo }
                />
            ) : null }
        </>
    );
};
