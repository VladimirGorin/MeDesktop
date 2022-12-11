// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { Range } from 'rc-slider';
import * as helper from '../../lib/helper';

export const PriceSlider = (props) => {
    const {
        minMaxPrice,
        productsMinValue,
        productsMaxValue,
        setPriceFromAndTo,
        settings,
        currentLang,
        setPriceHash,
        getHash,
        showPriceSlider,
        setShowPriceSlider,
    } = props;
    const [ minPrice, setMinPrice ] = useState(10);
    const [ maxPrice, setMaxPrice ] = useState(0);
    const [ minValue, setMinValue ] = useState(0);
    const [ maxValue, setMaxValue ] = useState(0);

    useEffect(() => {
        const hashFrom = getHash('from');
        const hashTo = getHash('to');
        setMinPrice(minMaxPrice[ 0 ]);
        setMaxPrice(minMaxPrice[ 1 ]);
        setMinValue(hashFrom ? hashFrom : productsMinValue);
        setMaxValue(hashTo ? hashTo : productsMaxValue);
        if (minMaxPrice[ 0 ] > 0 && minMaxPrice[ 1 ] > 0 && productsMinValue > 0 && productsMaxValue > 0) {
            setShowPriceSlider(true);
        }
    }, [ minMaxPrice, productsMinValue, productsMaxValue ]);

    const setValues = (values) => {
        if (Array.isArray(values) && values.length === 2) {
            setPriceHash(values, minValue, maxValue);
            setMinValue(values[ 0 ]);
            setMaxValue(values[ 1 ]);
            setPriceFromAndTo(...values);
        }
    };

    return (
        showPriceSlider ? (
            <div className = 'price-filter'>
                <div className = 'attribute-title'>{window[ currentLang ].price}</div>
                <Range
                    allowCross = { false }
                    className = 'price-filter-range'
                    defaultValue = { [ minValue, maxValue ] }
                    disabled = { maxValue === 0 }
                    max = { maxPrice }
                    min = { minPrice }
                    onChange = { setValues }
                />
                <div className = 'columns is-mobile is-gapless price-filter-values'>
                    <div className = 'column has-text-left'>
                        {helper.formatCurrency(minValue, settings)}
                    </div>
                    <div className = 'column has-text-right'>
                        {helper.formatCurrency(maxValue, settings)}
                    </div>
                </div>
            </div>
        ) : null
    );
};
