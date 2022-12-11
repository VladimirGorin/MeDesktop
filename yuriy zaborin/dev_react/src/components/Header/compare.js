// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCategoryById } from '../../lib/helper';

const CompareItem = (props) => {
    const { id, items, deleteCompareItem, categories, closeAll, currentLang } = props;
    const category = getCategoryById(categories, id);

    return (
        category ? (
            <div className = 'columns is-mobile'>
                <div className = 'column is-10'>
                    <div>
                        <NavLink
                            to = { '/compare/' + id }
                            onClick = { () => closeAll() }>
                            {category.name} ( {items.length} )
                        </NavLink>
                    </div>
                </div>
                <div className = 'column is-2'>
                  
                    <img
                        alt = { window[ currentLang ].remove }
                        className = 'icon-remove'
                        src = '/assets/images/icons/remove.svg'
                        onClick = { () => deleteCompareItem(id) }
                    />
                </div>
            </div>
        ) : null
    );
};

export const CompareMenu  = (props) => {
    const { compare, deleteCompareItem, settings, currentLang } = props;

    if (compare && Object.keys(compare).length > 0) {
        const items = Object.keys(compare).map((id) => (
            <CompareItem
                { ...props }
                deleteCompareItem = { deleteCompareItem }
                id = { id }
                items = { compare[ id ] }
                key = { id }
                settings = { settings }
            />
        ));

        return (
            <div className = 'mini-cart'>
                {items}
            </div>
        );
    }

    return (
        <div className = 'mini-cart'>
            <p>{window[ currentLang ].compareEmpty}</p>
        </div>
    );
};
