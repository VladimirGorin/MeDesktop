// eslint-disable-line
import React from 'react';

const Option = ({ option, onChange, currentLang }) => {
    const values = option.values
        .sort((a, b) => {
            if (a.name > b.name) {
                return  1;
            }
            if (b.name > a.name) {
                return  -1;
            }

            return 0;
        })
        .map((value, index) => (
            <option
                key = { index }
                value = { value.id }>
                {value.name}
            </option>
        ));

    const notSelectedTitle = `${window[ currentLang ].selectOption} ${option.name}`;

    return (
        <div className = 'product-option'>
            <div className = 'product-option-name'>{option.name}</div>
            <span className = 'select is-fullwidth'>
                <select
                    onChange = { (event) => {
                        onChange(option.id, event.target.value);
                    } }>
                    <option value = ''>{notSelectedTitle}</option>
                    {values}
                </select>
            </span>
        </div>
    );
};

const Options = ({ options, onChange, currentLang }) => {
    if (options && options.length > 0) {
        const items = options.map((option, index) => (
            <Option
                currentLang = { currentLang }
                key = { index }
                option = { option }
                onChange = { onChange }
            />
        ));

        return <div className = 'product-options'>{items}</div>;
    }

    return null;
};
export default Options;
