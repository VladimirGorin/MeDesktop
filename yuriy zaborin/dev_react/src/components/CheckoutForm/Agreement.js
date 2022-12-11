// eslint-disable-line
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal');

export const Agreement = ({
    agreement,
    id,
    className,
    label,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const { currentLang } = props;
    const [ userAgreement, setUserAgreement ] = useState(true);
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    return (
        <div className = { className }>
            <input
                checked = { userAgreement }
                className = { `m-checkbox__input m-checkbox--switch__input ${
                    touched[ field.name ] && errors[ field.name ] ? 'error' : ''
                }` }
                id = { id }
                type = 'checkbox'
                value = { id }
                onClick = { () => setUserAgreement(!userAgreement) }
                { ...field }
            />
            <label
                className = 'label'
                htmlFor = { id }>
                {window[ currentLang ].agreement_text}
            </label>
            <span
                className = 'label_link'
                onClick = { () => { setModalIsOpen(true); } }>
                {window[ currentLang ].agreement}
            </span>
            { modalIsOpen ? (
                <Modal
                    className = 'modalOrder'
                    contentLabel = 'Example Modal'
                    isOpen = { modalIsOpen }
                    overlayClassName = 'Overlay'
                    onRequestClose = { () => setModalIsOpen(false) }>
                    <div className = 'modalContainer'>
                        <span
                            className = 'close'
                            onClick = { () => setModalIsOpen(false) }
                        />
                        <div className = 'columns'>
                            <div className = 'checkout-success-details'>
                                <div className = 'column is-12 text-center'>
                                    <div
                                        className = 'mb15'
                                        dangerouslySetInnerHTML = {{ __html: agreement  }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : null }
        </div>
    );
};
