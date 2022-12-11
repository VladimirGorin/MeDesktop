// eslint-disable-line
import React from 'react';

const CartCount = ({ cartCount }) => {
    if (cartCount > 0) {
        return <span className = 'cart-count'>{cartCount}</span>;
    }

    return null;
};

const CartIcon = ({ cartIsActive, currentLang }) => {
    if (cartIsActive) {
        return (
            <img
                alt = { window[ currentLang ].close }
                className = 'icon'
                src = '/assets/images/close.svg'
                style = {{ minWidth: 24, padding: 4 }}
                title = { window[ currentLang ].close }
            />
        );
    }

    return (
        <img
            alt = { window[ currentLang ].cart }
            className = 'icon'
            src = '/assets/images/shopping-bag.svg'
            style = {{ minWidth: 24 }}
            title = { window[ currentLang ].cart }
        />
    );
};

export const CartIndicator  = (props) => {
    const { onClick, cartIsActive, cartCount, currentLang } = props;

    return (
        <span
            className = 'cart-button'
            onClick = { onClick }>
            <CartIcon
                cartIsActive = { cartIsActive }
                currentLang = { currentLang }
            />
            <CartCount cartCount = { cartCount } />
        </span>
    );
};
