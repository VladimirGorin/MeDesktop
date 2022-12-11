// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AttributeValue = (props) => {
    const { valueName, valueId, attributeId, category, queryClear } = props;
    const [ checked, setChecked ] = useState(props.checked);

    useEffect(() => {
        if (queryClear.length > 0 && queryClear.indexOf(valueId) !== -1) {
            setChecked(false);
        }
    }, [ queryClear ]);

    const onChange = (event) => {
        const {
            setFilterAttribute,
            unsetFilterAttribute,
            attributeId,
            valueId,
        } = props;
        const { checked } = event.target;

        setChecked(checked);

        if (checked) {
            setFilterAttribute(attributeId, valueId);
        } else {
            unsetFilterAttribute(attributeId, valueId);
        }
    };

    const onClick = (event) => {
        event.preventDefault();
    };


    const classChecked = checked ? 'attribute-checked' : '';

    return (
        attributeId === 'brands' ? (
            <label className = { `label ${classChecked}` }>
                <input
                    checked = { checked }
                    type = 'checkbox'
                    onChange = { onChange }
                />
                <Link
                    to = { `${category.path }proizvoditel:${valueName.replace(/[\s-_]/g, '').toLowerCase()}-${valueId}/` }
                    onClick = { onClick }>
                    {valueName}
                </Link>
            </label>
        ) : (
            <label className = { `label ${classChecked}` }>
                <input
                    checked = { checked }
                    type = 'checkbox'
                    onChange = { onChange }
                />
                {valueName}
            </label>
        )

    );
};

const AttributeSet = (props) => {
    const {attribute, setFilterAttribute, unsetFilterAttribute, brands, query, currentLang} = props;
    const [ visible, setVisible ] = useState(false);
    const values = attribute.values.map((value, index) => (
        <AttributeValue
            { ...props }
            attributeId = { attribute._id }
            attributeName = { attribute.name }
            checked = {
                (attribute._id === 'brands' && brands && brands.length > 0 && brands.indexOf(value._id) !== -1)
                || (attribute._id !== 'brands' && query && query.length > 0 && query.indexOf(value._id) !== -1)
            }
            key = { index }
            setFilterAttribute = { setFilterAttribute }
            unsetFilterAttribute = { unsetFilterAttribute }
            valueId = { value._id }
            valueName = { currentLang === 'ua' && value.name_ua ? value.name_ua : value.name }
        />
    ));

    useEffect(() => {
        if (attribute._id === 'brands' && brands && brands.length > 0) {
            setVisible(true);
        }
        if (attribute._id !== 'brands' && query && query.length > 0 && attribute.values.find((value)=>query.indexOf(value._id) !== -1)) {
            setVisible(true);
        }
    }, [ ]);

    const blockClass = `attribute ${ visible ? 'open' : '' }`;

    return (
        <div className = { blockClass }>
            <div
                className = 'attribute-title'
                onClick = { () => { setVisible(!visible); } }>
                { currentLang === 'ua' && attribute.name_ua ? attribute.name_ua : attribute.name }
            </div>
            <div className = { blockClass }>{values}</div>
        </div>
    );
};

const AttributeFilter = (props) => {
    const {attributes, setFilterAttribute, unsetFilterAttribute} = props;
    const attributeSets = attributes.map((attribute, index) => attribute.status ? (
        <AttributeSet
            { ...props }
            attribute = { attribute }
            key = { index }
            setFilterAttribute = { setFilterAttribute }
            unsetFilterAttribute = { unsetFilterAttribute }
        />
    ) : null);

    return <div className = 'attribute-filter'>{attributeSets}</div>;
};

export { AttributeFilter };
