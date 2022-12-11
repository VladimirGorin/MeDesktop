// eslint-disable-line
import React from 'react';

export const CreditButton = (props) => {
    const { product, currentLang } = props;

    if (product.stock_status_id === 7 || product.stock_status_id === 6) {
        return (
            <>
                <button
                    className = 'button is-credit is-fullwidth'
                    id = 'is-credit'
                    title = { window[ currentLang ].creditText }
                    onClick = { () => { window.buyInCredit(Math.round(product.price_local), '', product.name, 'andrey@comtrading.ua'); } }>
                    {window[ currentLang ].creditText}
                </button>
            </>
        );
    }

    return null;
};
