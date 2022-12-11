// eslint-disable-line
import React from 'react';

const Property = ({ name, value, isCompare, currentLang }) => isCompare ? (
    <div className = 'columns is-gapless is-mobile product-attribute'>
        <div className = 'column attribute-value'>{value ? value : <span className = 'empty'>{ window[ currentLang ].empty }</span>}</div>
    </div>
) : (
    <div className = 'columns is-gapless is-mobile product-attribute'>
        <div className = 'column is-5 attribute-name'>{name}:</div>
        <div className = 'column is-7 attribute-value'>{value}</div>
    </div>
);
const Properties = (props) => {
    const { list, isCompare, currentLang} = props;
    if (list && list.length > 0) {
        const items = list.map((attribute, index) => (
            <Property
                currentLang = { currentLang }
                isCompare = { isCompare }
                key = { index }
                name = { attribute.name }
                value = { attribute.value }
            />
        ));

        return (
            <div className = 'product-attributes'>
                <div className = 'title is-5'>{window[ currentLang ].attributes}</div>
                {items}
            </div>
        );
    }

    return null;
};
export { Properties };
