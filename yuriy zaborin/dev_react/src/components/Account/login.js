// eslint-disable-line
import React, { useState } from 'react';
import { LoginForm, RegisterForm, ForgotForm } from '../../components';
import Modal from 'react-modal';

Modal.setAppElement('#modal');

export const Login = (props) => {
    const { closeModal, modalLoginIsOpen} = props;
    const [ isRegisterForm, setIsRegisterForm ] = useState(false);
    const [ isForgotForm, setIsForgotForm ] = useState(false);
    const changeForm = (register, forgot) => {
        setIsRegisterForm(register);
        setIsForgotForm(forgot);
    };

    return (
        <Modal
            className = 'modalOrder'
            contentLabel = 'Example Modal'
            isOpen = { modalLoginIsOpen }
            overlayClassName = 'Overlay'
            onRequestClose = { () => closeModal() }>
            <div className = 'modalContainer'>
                <span
                    className = 'close'
                    onClick = { () => closeModal() }
                />
                { isRegisterForm
                    ? (
                        <RegisterForm
                            { ...props }
                            changeForm = { changeForm }
                        />
                    ) : null
                }
                { isForgotForm
                    ? (
                        <ForgotForm
                            { ...props }
                            changeForm = { changeForm }
                        />
                    ) : null
                }
                { !isForgotForm && !isRegisterForm
                    ? (
                        <LoginForm
                            { ...props }
                            changeForm = { changeForm }
                        />
                    ) : null
                }
            </div>
        </Modal>
    );
};
