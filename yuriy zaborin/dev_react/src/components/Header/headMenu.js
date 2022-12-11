// eslint-disable-line
import React,  { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBtc } from '@fortawesome/free-brands-svg-icons';

const HeadMenuItem = (props) => {
    const { categories, category, level, isMobile, setIsActive, isActive, isActiveSub, setIsActiveSub, onClick, links } = props;

    const openMenuHandler = () => {
        if (level === 1) {
            setIsActive(category.id);
        } else if (level === 2) {
            setIsActiveSub(category.id);
        }
    };

    const items = categories
        .filter((item) => item.parent_id === category.id && level === 1)
        .map((subcategory, index) => (
            <HeadMenuItem
                categories = { categories }
                category = { subcategory }
                isActive = { isActive }
                isActiveSub = { isActiveSub }
                isMobile = { isMobile }
                key = { index }
                level = { level + 1 }
                setIsActive = { setIsActive }
                setIsActiveSub = { setIsActiveSub }
                onClick = { onClick }
            />
        ));
    const hasItems = items.length > 0;

    const itemsMobile = categories
        .filter((item) => item.parent_id === category.id)
        .map((subcategory, index) => (
            <HeadMenuItem
                categories = { categories }
                category = { subcategory }
                isActive = { isActive }
                isActiveSub = { isActiveSub }
                isMobile = { isMobile }
                key = { index }
                level = { level + 1 }
                setIsActive = { setIsActive }
                setIsActiveSub = { setIsActiveSub }
                onClick = { onClick }
            />
        ));
    const hasItemsMobile = itemsMobile.length > 0;

    return (
        <li
            className = {
                (isActive === category.id ? ' is-active' : '')
                + (isActiveSub === category.id  && !isMobile ? ' is-sub-active' : '')
                + (isActiveSub === category.id  && isMobile ? ' is-active' : '')
                + (hasItems ? ' has-items' : '')
            }
            onClick = { openMenuHandler }>
            <div className = 'cat-parent'>
                { level > 2 || category.isPage ? (
                    <NavLink
                        activeClassName = 'is-active'
                        className = { hasItems ? 'is-link has-items' : 'is-link' }
                        to = { category.path }>
                        {category.name}
                    </NavLink>
                ) : (
                    <span
                        className = { hasItems ? 'is-link has-items' : 'is-link' }>
                        {category.name}
                    </span>
                ) }

                {hasItems && isMobile && <span onClick = { openMenuHandler } />}
            </div>
            {hasItems && !isMobile && (
                <div
                    className = { `${
                        level === 1 ? 'columns is-gapless is-multiline' : ''
                    } nav-level-${level}` }>
                    <ul className = 'column is-3 left-items'>
                        {items}
                    </ul>
                    <ul className = 'column is-9 right-items'>
                        {links}
                    </ul>
                </div>
            )}
            {hasItemsMobile && isMobile && (
                <ul
                    className = { `${
                        level === 1 ? 'columns is-gapless is-multiline' : ''
                    } nav-level-${level}` }>
                    {itemsMobile}
                </ul>
            )}
        </li>
    );
};

export const HeadMenu = (props) => {
    const { categories, onClick, isMobile, topMenuItems, currentPage, menuClose, currentLang } = props;
    const [ isActive, setIsActive ] = useState(0);
    const [ isActiveSub, setIsActiveSub ] = useState(0);
    const [ links, setLinks ] = useState([]);
    const ref = useRef(null);
    let addItemsToMenu = [];
    if (topMenuItems && topMenuItems.length > 0) {
        addItemsToMenu = topMenuItems.map((item) => ({
            name:      item.name,
            path:      item.path,
            id:        '',
            parent_id: 0,
            isPage:    true,
        }));
    }
    const menuItems = [ ...categories, ...addItemsToMenu ];

    useEffect(() => {
        setIsActive(0);
        setIsActiveSub(0);
        menuClose();
    }, [ currentPage ]);

    useEffect(() => {
        const items = categories.filter((item) => item.parent_id === isActive && isActive > 0 && !isMobile);
        if (items.length > 0) {
            setIsActiveSub(items[ 0 ].id);
        } else {
            setLinks([]);
        }
    }, [ isActive ]);

    useEffect(() => {
        const items = categories
            .filter((item) => item.parent_id === isActiveSub && isActiveSub > 0 && !isMobile)
            .map((subcategory, index) => (
                <li
                    className = 'column is-3'
                    key = { index }>
                    <NavLink
                        activeClassName = 'is-active'
                        className = 'is-link'
                        to = { subcategory.path }>
                        {subcategory.name}
                    </NavLink>
                </li>
            ));
        setLinks(items);
    }, [ isActiveSub ]);

    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && !isMobile) {
            setIsActive(0);
            setIsActiveSub(0);
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
        // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const items = menuItems
        .filter((category) => category.parent_id === 0)
        .map((category, index) => (
            <HeadMenuItem
                categories = { categories }
                category = { category }
                isActive = { isActive }
                isActiveSub = { isActiveSub }
                isMobile = { isMobile }
                key = { index }
                level = { 1 }
                links = { links }
                setIsActive = { setIsActive }
                setIsActiveSub = { setIsActiveSub }
                onClick = { onClick }
            />
        ));

    return (
        <ul
            className = 'nav-level-0 nav-menu'
            ref = { ref }>
            {items}
            <li className = 'mining'>
                <NavLink
                    activeClassName = 'is-active'
                    className = 'is-link'
                    to = '/mining/'>
                    <FontAwesomeIcon icon = { faBtc } />
                    {window[ currentLang ].for_mining}
                </NavLink>
            </li>
        </ul>
    );
};
