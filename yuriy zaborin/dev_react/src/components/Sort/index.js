// eslint-disable-line
import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings } from '../../lib/settings';

const Sort = ({ defaultSort, currentSort, setSort, currentLang }) => (
    <div className = 'columns is-mobile sort'>
        <div className = 'column is-4 sort-title'>{window[ currentLang ].sort}:</div>
        <div className = 'column'>
            <span className = 'select is-fullwidth'>
                <select
                    value = { currentSort }
                    onChange = { (event) => {
                        setSort(event.target.value);
                    } }>
                    <option value = { defaultSort }>{window[ currentLang ].sortRelevant}</option>
                    <option value = { themeSettings.sortPriceLow }>
                        {window[ currentLang ].sortPriceLow}
                    </option>
                    <option value = { themeSettings.sortPriceHigh }>
                        {window[ currentLang ].sortPriceHigh}
                    </option>
                </select>
            </span>
        </div>
    </div>
);

Sort.propTypes = {
    defaultSort: PropTypes.string.isRequired,
    currentSort: PropTypes.string.isRequired,
    setSort:     PropTypes.func.isRequired,
};

export { Sort };
