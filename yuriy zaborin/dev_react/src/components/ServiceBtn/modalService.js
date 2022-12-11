// eslint-disable-line
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ServiceForm } from '../../components';
import { api } from '../../Api';

Modal.setAppElement('#modal');

export const ModalService = (props) => {
    const { closeModal, modalIsOpen, clearForm, currentLang } = props;
    const [ showConfirm, setShowConfirm ] = useState(false);

    const createServiceRequest = (values) => {
        if (values) {
            const setServiceRequest = async (values) => {
                const result = await api.setServiceRequest(values);
                if (result && result.success) {
                    setShowConfirm(true);
                    clearForm();
                }
            };
            setServiceRequest(values);
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
                {window[ currentLang ].serviceSuccessTitle}
            </h2>
            <hr />
            <div className = 'column is-12 text-center'>
                <b>{window[ currentLang ].serviceSuccessText}</b>
            </div>
        </div>
    ) : (
        <div className = 'column is-12-widescreen is-12-desktop'>
            <ServiceForm
                { ...props }
                createServiceRequest = { createServiceRequest }
            />
        </div>
    );

    return (
        <Modal
            className = 'modalService'
            contentLabel = 'Service Modal'
            isOpen = { modalIsOpen }
            overlayClassName = 'Overlay'
            onRequestClose = { () => closeModal() }>
            <div className = 'modalContainer'>
                <span
                    className = 'close'
                    onClick = { () => closeModal() }
                />
                <div className = 'columns'>
                    { content }
                </div>
            </div>
        </Modal>
    );
};
