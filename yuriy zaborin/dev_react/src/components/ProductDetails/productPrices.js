// eslint-disable-line
import React from 'react';
import * as helper from '../../lib/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

export const ProductPrices = (props) => {
    const { item, settings } = props;

    const translate = {
        set_default_price:        'Цена по умолчанию',
        set_autorized_price:      'Цена залогиненного пользователя',
        use_vi_rrc_price:         'BI РРЦ',
        set_fixed_price:          'Фиксировання цена',
        use_vi_price:             'BI Цена',
        set_price_fixed_rrc_date: 'Фиксировання по дате РРЦ',
        used_rule:                'Правило',
        used_rule_1:              'Правило 1',
        used_rule_2:              'Правило 2',
        set_rrc_rules:            'РРЦ по правилу',
        SetRRC:                   'Уст. РРЦ',
        unSetRRC:                 'Не уст. РРЦ',
        rrc_flag:                 'РРЦ на сайте',
        unSetNoMonitorRRC:        'Снять монитор РРЦ',
    };

    return (
        <div className = { `pricesListRow ${item.type}` }>
            <div className = 'pricesListItem type'>
                { translate[ item.type ] }
            </div>
            {item.type.indexOf('used_rule') !== -1 ? (
                <>
                    <div className = 'pricesListItem category rule'>
                        <div className = { `eq_${item.rule_category_eq}` }>{ item.category ? item.category : '' }</div>
                    </div>
                    <div className = 'pricesListItem manufacturer rule'>
                        <div className = { `eq_${item.rule_manufacturer_eq}` }>{ item.manufacturer ? item.manufacturer : '' }</div>
                    </div>
                    <div className = 'pricesListItem supl rule'>
                        <div className = { `eq_${item.rule_suplier_eq}` }>{ item.suplier ? item.suplier : '' }</div>
                    </div>
                    <div className = 'pricesListItem rrc_flag rule'>
                        <div className = 'used_rule_value'>
                            { item.rrc_flag ? (
                                <FontAwesomeIcon icon = { faCheck } />
                            ) : (
                                <FontAwesomeIcon icon = { faBan } />
                            )}
                        </div>
                    </div>
                    <div className = 'pricesListItem rrcMonitor rule'>
                        <div className = 'used_rule_value'>
                            { item.rrcMonitor ? (
                                <FontAwesomeIcon icon = { faCheck } />
                            ) : (
                                <FontAwesomeIcon icon = { faBan } />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {item.type === 'header_rules' ? (
                        <>
                            <div className = 'pricesListItem category rule'>
                                <div>Категория</div>
                            </div>
                            <div className = 'pricesListItem manufacturer rule'>
                                <div>Производитель</div>
                            </div>
                            <div className = 'pricesListItem supl rule'>
                                <div>Поставщик</div>
                            </div>
                            <div className = 'pricesListItem rrc_flag rule'>
                                <div>РРЦ на сайте</div>
                            </div>
                            <div className = 'pricesListItem rrcMonitor rule'>
                                <div>РРЦ Монитор</div>
                            </div>
                        </>
                    ) : (
                        <>
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
                                { item.price_local ? (
                                    <FormattedCurrency
                                        number = { item.price_local }
                                        settings = { settings }
                                    />
                                ) : null }
                            </div>
                            <div className = 'pricesListItem rule'>
                                <>
                                    <div>{ translate.SetRRC }</div>
                                    <div className = 'used_rule_value'>
                                        { item.SetRRC ? (
                                            <FontAwesomeIcon icon = { faCheck } />
                                        ) : (
                                            <FontAwesomeIcon icon = { faBan } />
                                        )}
                                    </div>
                                </>
                            </div>
                            <div className = 'pricesListItem rule'>
                                <>
                                    <div>{ translate.unSetRRC }</div>
                                    <div className = 'used_rule_value'>
                                        { item.unSetRRC ? (
                                            <FontAwesomeIcon icon = { faCheck } />
                                        ) : (
                                            <FontAwesomeIcon icon = { faBan } />
                                        )}
                                    </div>
                                </>
                            </div>
                            <div className = 'pricesListItem rule'>
                                <>
                                    <div>{ translate.rrc_flag }</div>
                                    <div className = 'used_rule_value'>
                                        { item.rrc_flag ? (
                                            <FontAwesomeIcon icon = { faCheck } />
                                        ) : (
                                            <FontAwesomeIcon icon = { faBan } />
                                        )}
                                    </div>
                                </>
                            </div>
                        </>
                    ) }

                </>
            )}
        </div>
    );
};
