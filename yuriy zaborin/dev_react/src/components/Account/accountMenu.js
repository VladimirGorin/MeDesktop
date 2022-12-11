// eslint-disable-line
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { book } from '../../lib';
import { api } from '../../Api';

import Modal from 'react-modal';

Modal.setAppElement('#modal');

export const AccountMenu = (props) => {
    const { user, currentLang, setAuthorized, setUser, setIsManager } = props;
    const [ showModal, setShowModal ] = useState(false);


    const logout = () => {
        setAuthorized(false);
        setUser({});
        setIsManager(false);
        props.history.push('/');
    };

    const remove = async () => {
        const result = await api.removeAccount(user);
        if (result) {
            localStorage.removeItem('compare');
            localStorage.removeItem('wishList');
            localStorage.removeItem('user');
            localStorage.removeItem('viewedProducts');
            logout();
        }
    };

    const accountLinks = [
        {
            name: window[ currentLang ].change_account,
            to:   book.account.change_account.path,
        },
        {
            name: window[ currentLang ].change_password,
            to:   book.account.change_password.path,
        },
        {
            name: window[ currentLang ].change_address,
            to:   book.account.change_address.path,
        },
    ];

    const orderLinks = [
        {
            name: window[ currentLang ].order_history,
            to:   book.account.order.path,
        },
    ];

    return (
        <div className = 'left_menu'>
            <h3>{window[ currentLang ].my_account}</h3>
            <ul>
                { accountLinks.map((item, index) => (
                    <li key = { index }>
                        <NavLink
                            activeClassName = 'is-active'
                            className = 'is-link'
                            to = { item.to }>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <h3>{window[ currentLang ].my_orders}</h3>
            <ul>
                { orderLinks.map((item, index) => (
                    <li key = { index }>
                        <NavLink
                            activeClassName = 'is-active'
                            className = 'is-link'
                            to = { item.to }>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className = 'logout'>
                <span
                    className = 'login'
                    onClick = { () => { logout(); } }>
                    {window[ currentLang ].logout}
                </span>
            </div>
            <div className = 'remove-account'>
                <span
                    className = 'remove'
                    onClick = { () => { setShowModal(true); } }>
                    {window[ currentLang ].remove_account}
                </span>
            </div>
            <Modal
                className = 'modalOrder'
                contentLabel = 'Example Modal'
                isOpen = { showModal }
                overlayClassName = 'Overlay'
                onRequestClose = { () => setShowModal(false) }>
                <div className = 'modalContainer removeAccount'>
                    <span
                        className = 'close'
                        onClick = { () => setShowModal(false) }
                    />
                    <div className = 'description'>
                        { window[ currentLang ].remove_account_description }
                    </div>
                    <div className = 'modalRemove-buttons'>
                        <button
                            className = 'button is-danger'
                            onClick = { ()=>remove() }>
                            { window[ currentLang ].remove_account }
                        </button>
                        <button
                            className = 'button is-primary'
                            onClick = { () => setShowModal(false) }>
                            { window[ currentLang ].cancel }
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
