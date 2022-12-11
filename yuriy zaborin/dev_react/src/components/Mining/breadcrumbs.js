// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';

const MiningBreadcrumbs = ({currentLang}) => {
    return (
        <nav
            aria-label = 'breadcrumbs'
            className = 'breadcrumb is-small product-breadcrumb'>
            <ul>
                <li>
                    <NavLink to = '/'>{window[ currentLang ].home}</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MiningBreadcrumbs;
