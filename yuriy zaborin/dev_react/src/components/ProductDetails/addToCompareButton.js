// eslint-disable-line
import React from 'react';

const AddToCompareButton = (props) => {
    const {addToCompare, removeFromCompare, product, compareItems, currentLang, isCompare } = props;
    if (product.stock_status_id === 7 || product.stock_status_id === 6 || (isCompare && product.stock_status_id === 5)) {
        const active = compareItems.indexOf(product.id) !== -1;

        return (
            <div
                className = { `addcompare-button ${ active ? 'active' : '' }` }
                title = { window[ currentLang ].compare }
                onClick = { () => { active ? removeFromCompare(product) : addToCompare(product); } }
            />
        );
    }

    return null;
};

export { AddToCompareButton };
