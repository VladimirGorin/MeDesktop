// eslint-disable-line
import React from 'react';

const Attribute = ({ name, value, isCompare, currentLang }) => isCompare ? (
    <div className = 'columns is-gapless is-mobile product-attribute'>
        <div className = 'column attribute-value'>{value ? value : <span className = 'empty'>{ window[ currentLang ].empty }</span>}</div>
    </div>
) : (
    <div className = 'columns is-gapless is-mobile product-attribute'>
        <div className = 'column is-5 attribute-name'>{name}:</div>
        <div className = 'column is-7 attribute-value'>{value}</div>
    </div>
);
const Attributes = (props) => {
    const { attributes, isCompare, currentLang} = props;
    if (attributes && attributes.length > 0) {
        const items = attributes.map((attribute, index) => currentLang === 'ua' ? (
            <Attribute
                currentLang = { currentLang }
                isCompare = { isCompare }
                key = { index }
                name = { attribute.option_ua }
                value = { attribute.name_ua }
            />
        ) : (
            <Attribute
                currentLang = { currentLang }
                isCompare = { isCompare }
                key = { index }
                name = { attribute.option }
                value = { attribute.name }
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
export { Attributes };
