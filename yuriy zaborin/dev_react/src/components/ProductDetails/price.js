// eslint-disable-line
import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings } from '../../lib/settings';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

const NewAndOldPrices = ({ newPrice, oldPrice, settings }) => (
    <div className = 'product-price'>
        <span className = 'product-new-price'>
            <FormattedCurrency
                number = { newPrice }
                settings = { settings }
            />
        </span>
        <del className = 'product-old-price'>
            <FormattedCurrency
                number = { oldPrice }
                settings = { settings }
            />
        </del>
    </div>
);

const Price = ({ product, settings, currentLang }) => {
    const priceStyle = {};
    if (
        themeSettings.details_price_size && themeSettings.details_price_size > 0
    ) {
        priceStyle.fontSize = `${themeSettings.details_price_size}px`;
    }
    if (
        themeSettings.details_price_color && themeSettings.details_price_color.length > 0
    ) {
        priceStyle.color = themeSettings.details_price_color;
    }

    let priceLocal = 0;
    let price = 0;
    let oldPrice = 0;

    priceLocal = product.price_local;
    price = product.price;

    if (product.on_sale) {
        oldPrice = product.regular_price;
    }

    if (oldPrice > 0) {
        return (
            <NewAndOldPrices
                newPrice = { priceLocal }
                oldPrice = { oldPrice }
                settings = { settings }
            />
        );
    }

    return !product.stock_status_id || product.stock_status_id === 5 ? null : (
        <div
            className = 'product-price'
            style = { priceStyle }>
            <div className = 'product-price-text'>{window[ currentLang ].price}</div>
            <FormattedCurrency
                number = { priceLocal }
                settings = { settings }
            />
            <div className = 'price_small'>
                <FormattedCurrency
                    number = { price }
                    settings = {{
                        decimal_number:     2,
                        thousand_separator: ' ',
                        currency_format:    settings.currency_format_usd,
                    }}
                />
            </div>
        </div>
    );
};

export default Price;
