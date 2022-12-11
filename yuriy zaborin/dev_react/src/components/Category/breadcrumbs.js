// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';

const CategoryBreadcrumbs = ({ categoryId, categories, currentLang }) => {
    const items = helper.getCategoryBreadcrumbs(categoryId, categories);

    return (
        <nav
            aria-label = 'breadcrumbs'
            className = 'breadcrumb is-small product-breadcrumb'>
            <ul>
                <li>
                    <NavLink to = '/'>{window[ currentLang ].home}</NavLink>
                </li>
                {items}
            </ul>
        </nav>
    );
};

export default CategoryBreadcrumbs;
