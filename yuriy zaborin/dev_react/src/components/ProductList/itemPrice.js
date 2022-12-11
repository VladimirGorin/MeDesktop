// eslint-disable-line
import React from 'react';
import { themeSettings } from '../../lib/settings';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

const ItemPrice = ({ product, settings, currentLang }) => {
    const priceStyle = {};
    if (themeSettings.list_price_size && themeSettings.list_price_size > 0) {
        priceStyle.fontSize = `${themeSettings.list_price_size}px`;
    }
    if (
        themeSettings.list_price_color && themeSettings.list_price_color.length > 0
    ) {
        priceStyle.color = themeSettings.list_price_color;
    }

    if (product.on_sale) {
        return (
            <div className = 'product-price'>
                <span className = 'product-new-price'>
                    <FormattedCurrency
                        number = { product.price_local }
                        settings = { settings }
                    />
                </span>
                <del className = 'product-old-price'>
                    <FormattedCurrency
                        number = { product.regular_price }
                        settings = { settings }
                    />
                </del>
                <div className = 'stock_status'>
                    { window[ currentLang ][ 'stock_status_' + product.stock_status_id ] }
                </div>
            </div>
        );
    }

    return (
        <div
            className = 'product-price'
            style = { priceStyle }>
            { product.stock_status_id === 5 ? null : (
                <>
                    <FormattedCurrency
                        number = { product.price_local }
                        settings = { settings }
                    />
                    <div className = 'price_small'>
                        <FormattedCurrency
                            number = { product.price }
                            settings = {{
                                decimal_number:     2,
                                thousand_separator: ' ',
                                currency_format:    settings.currency_format_usd,
                            }}
                        />
                    </div>
                    { product.price_marg ? (
                        <div className = 'product-price-rrc'>
                            {window[ currentLang ].rrc_price}
                            <b>
                                <FormattedCurrency
                                    number = { product.price_marg }
                                    settings = {{
                                        decimal_number:     2,
                                        thousand_separator: ' ',
                                        currency_format:    settings.currency_format_usd,
                                    }}
                                />
                            </b>
                        </div>
                    ) : null }
                    { product.price_full ? (
                        <div className = 'product-price-rrc'>
                            {window[ currentLang ].rrc_price_in}
                            <b>
                                <FormattedCurrency
                                    number = { product.price_local_full }
                                    settings = { settings }
                                /> (
                                <FormattedCurrency
                                    number = { product.price_full }
                                    settings = {{
                                        decimal_number:     2,
                                        thousand_separator: ' ',
                                        currency_format:    settings.currency_format_usd,
                                    }}
                                />
                        )
                            </b>
                        </div>
                    ) : null }
                    { product.cashless_price ? (
                        <div className = 'product-price-rrc'>
                            {window[ currentLang ].cashless_price}
                            <b>
                                <FormattedCurrency
                                    number = { product.cashless_price_local }
                                    settings = { settings }
                                /> (
                                <FormattedCurrency
                                    number = { product.cashless_price }
                                    settings = {{
                                        decimal_number:     2,
                                        thousand_separator: ' ',
                                        currency_format:    settings.currency_format_usd,
                                    }}
                                />
                        )
                            </b>
                        </div>
                    ) : null }
                </>
            )}
            <div className = { `stock_status status_${ product.stock_status_id}` }>
                { window[ currentLang ][ 'stock_status_' + product.stock_status_id ] }
            </div>
        </div>
    );
};

export { ItemPrice };
