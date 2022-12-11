// eslint-disable-line
/* eslint-disable no-extra-parens */
import React from 'react';
import { settings } from '../../lib/settings';
import { ModalOrder } from '../../components';

export const OneClickButton = (props) => {
    const { openModal, closeModal, modalIsOpen, product, quantity, modalProduct, currentLang, isCompare } = props;
    let disabled = '';
    if (product.stock_status_id === 5) {
        disabled = 'disabled';
    }
    if (product.stock_status_id === 7 || product.stock_status_id === 6 || (isCompare && product.stock_status_id === 5)) {
        return (
            <>
                <button
                    className = 'button is-oneclick is-fullwidth'
                    disabled = { disabled }
                    title = { window[ currentLang ].oneClickText }
                    onClick = { () => { openModal(product.id); } }>
                    {window[ currentLang ].oneClickText}
                </button>
                { modalIsOpen && modalProduct === product.id ? (
                    <ModalOrder
                        { ...props }
                        closeModal = { closeModal }
                        modalIsOpen = { modalIsOpen }
                        product = { product }
                        quantity = { quantity }
                        settings = { settings }
                    />
                ) : null }
            </>
        );
    }

    return null;
};
