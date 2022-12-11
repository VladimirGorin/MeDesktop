// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { book } from '../../lib';

export const TopMenu = (props) => {
    const { topMenuItems, user, authorized, setModalLoginIsOpen, config, currentLang, setCurrentLang } = props;

    const addMenu = [
        {
            name:  window[ currentLang ].menu_corporative,
            path:  book.pages.corporate.path,
            class: 'corporate',
        },
        {
            name:  window[ currentLang ].menu_prices,
            path:  book.pages.prices.path,
            class: 'prices',
        },
    ];

    const showSale = config && config.setRasprodazha && config.setRasprodazha === '1';

    if (showSale) {
        addMenu.unshift({
            name:  window[ currentLang ].menu_sale,
            path:  book.common.sale.path,
            class: 'sale',
        });
    }

    const addMenuJSX = addMenu.map((item, index)=>(
        <li key = { index }>
            <NavLink
                activeClassName = 'is-active'
                className = { `top-menu__${item.class}` }
                to = {item.path.startsWith('/') ? item.path : { pathname: item.path} }
                target = {item.path.startsWith('/') ? "self" : "_blank" }>
                {item.name}
            </NavLink>
        </li>
    ));

    const items = topMenuItems.filter((item) => !item.mobile).map((item, index) => (
        <li key = { index }>
            <NavLink
                activeClassName = 'is-active'
                to = { item.path }>
                {item.name}
            </NavLink>
        </li>
    ));
    const login =  (
        <li key = 'login'>
            { authorized ? (
                <NavLink
                    className = 'login'
                    to = '/account/'>
                    {user.firstname}
                </NavLink>
            ) : (
                <span
                    className = 'login'
                    onClick = { () => { setModalLoginIsOpen(true); } }>
                    { window[ currentLang ].login}
                </span>
            ) }
        </li>
    );

    return (
        <div className  = 'top-menu-wrap'>
            <ul className = 'top-menu  is-hidden-mobile has-text-left'>
                {items}
                {login}
                {addMenuJSX}
            </ul>
            <div className = 'langs'>
                <span
                    className = { `lang ua ${currentLang === 'ua' ? 'current' : ''}` }
                    onClick = { ()=>setCurrentLang('ua') }>
                    { 'UA' }
                </span>
                <span
                    className = { `lang ru ${currentLang === 'ru' ? 'current' : ''}` }
                    onClick = { ()=>setCurrentLang('ru') }>
                    { 'RU' }
                </span>
            </div>
        </div>
    );
};
