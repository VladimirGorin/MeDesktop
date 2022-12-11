// eslint-disable-line
import React, { useEffect, useRef } from 'react';
import { themeSettings } from '../../lib/settings';
import * as helper from '../../lib/helper';

export const CreditButton2 = (props) => {
    const { product, currentLang } = props;
    const ref = useRef();

    const imageUrl = helper.getImageUrl(
        product.image,
        themeSettings.bigThumbnailWidth,
    );

    const init = () => {
        if (window.MfsCreditCalcWidget) {
            window.MfsCreditCalcWidget.init({
                selector:          '.MfsCreditCalcWidgetButton',
                rassrochkaEnabled: true,
                partner:           'citybikes.lviv.ua',
                banks:             [
                    'alpha', 'otp',
                    'creditmarket', 'factoring',
                ]});
        }
    };

    useEffect(() => {
        if (product.stock_status_id === 7 || product.stock_status_id === 6) {
            setTimeout(function() {
                init();
            }, 1000);
        }
    }, [ product.id ]);

    if (product.stock_status_id === 7 || product.stock_status_id === 6) {
        return (
            <button
                className = 'MfsCreditCalcWidgetButton button is-credit is-fullwidth'
                data-product-id = { product.id }
                data-product-image = { imageUrl }
                data-product-link = { window.location.href }
                data-product-name = { product.name }
                data-product-price = { product.price_local }
                ref = { ref }>
                {window[ currentLang ].credit2Text}
            </button>
        );
    }

    return null;
};
