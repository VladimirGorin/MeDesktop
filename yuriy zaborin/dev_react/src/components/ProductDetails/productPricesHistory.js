// eslint-disable-line
import React from 'react';
import * as helper from '../../lib/helper';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

export const ProductPricesHistory = (props) => {
    const { item, settings } = props;

    const translate = {
        hand:                   'CRM',
        cron_prices:            'Cron',
        cron_prices_vi:         'Cron BI',
        cron_prices_vi_rrc:     'Cron BI RRC',
        change_vi_checkbox:     'BI статус',
        change_vi_rrc_checkbox: 'BI RRC статус',
    };

    return (
        <div className = { `pricesListRow ${item.source}` }>
            <div className = 'pricesListItem price'>
                { item.price ? (
                    <FormattedCurrency
                        number = { item.price }
                        settings = {{
                            decimal_number:     2,
                            thousand_separator: ' ',
                            currency_format:    settings.currency_format_usd,
                        }}
                    />
                ) : null }
            </div>
            <div className = 'pricesListItem price'>
                { item.price_rrc ? (
                    <FormattedCurrency
                        number = { item.price_rrc }
                        settings = { settings }
                    />
                ) : null }
            </div>
            <div className = 'pricesListItem price'>
                { typeof item.price_vi !== 'undefined' ? (
                    <FormattedCurrency
                        number = { item.price_vi }
                        settings = { settings }
                    />
                ) : null }
                { typeof item.vi_status !== 'undefined'
                    ? (
                        <FontAwesomeIcon icon = { item.vi_status ? faCheck : faBan } />
                    ) : null }
            </div>
            <div className = 'pricesListItem price'>
                { typeof item.price_vi_rrc !== 'undefined' ? (
                    <FormattedCurrency
                        number = { item.price_vi_rrc }
                        settings = { settings }
                    />
                ) : null }
                { typeof item.vi_rrc_status !== 'undefined'
                    ? (
                        <FontAwesomeIcon icon = { item.vi_rrc_status ? faCheck : faBan } />
                    ) : null }
            </div>
            <div className = 'pricesListItem price'>
                { item.fixed_price ? (
                    <FormattedCurrency
                        number = { item.fixed_price }
                        settings = {{
                            decimal_number:     2,
                            thousand_separator: ' ',
                            currency_format:    settings.currency_format_usd,
                        }}
                    />
                ) : null }
            </div>
            <div className = 'pricesListItem date'>
                { item.fixed_price_date ? item.fixed_price_date : null }
            </div>
            <div className = 'pricesListItem date comment'>
                { item.comment ? item.comment : null }
            </div>
            <div className = 'pricesListItem date'>
                { item.created ? moment(item.created).format('DD.MM.YYYY HH:mm') : moment(item.createdAt).format('DD.MM.YYYY HH:mm') }
            </div>
            <div className = 'pricesListItem source'>
                { translate[ item.source ]}
            </div>
        </div>
    );
};
