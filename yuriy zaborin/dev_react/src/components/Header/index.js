// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MultiSearchBox, CartIndicator, Cart, HeadMenu, TopMenu, CompareMenu, WishListIndicator, CompareIndicator, Login } from '../../components';
import { book } from '../../lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { IS_KTK } from '../../config';

export const Header = (props) => {
    const { categories, config, user, authorized, currentLang,
        settings, cartToggle, mobileMenuIsActive, cartIsActive, mobileSearchIsActive, menuToggle, modalLoginIsOpen,
        setModalLoginIsOpen, closeAll, menuClose, compareToggle, compareIsActive, showMobile, setShowMobile } = props;

    const closeModal = () => {
        setModalLoginIsOpen(false);
    };

    const topMenuItems = [
        {
            name: window[ currentLang ].menu_service,
            path: book.pages.service.path,
        }, {
            name: window[ currentLang ].menu_howtobuy,
            path: book.pages.howToBuy.path,
        }, {
            name: window[ currentLang ].menu_contact,
            path: book.pages.contact.path,
        },  {
            name:   window[ currentLang ].menu_corporative,
            path:   book.pages.corporate.path,
            mobile: true,
        }, {
            name:   window[ currentLang ].menu_prices,
            path:   book.pages.prices.path,
            mobile: true,
        },
    ];

    const showSale = config && config.setRasprodazha && config.setRasprodazha === '1';

    if (showSale) {
        topMenuItems.push({
            name:   window[ currentLang ].menu_sale,
            path:   book.common.sale.path,
            mobile: true,
        });
    }

    const Logo = ({ src, onClick, alt }) => (
        <NavLink
            className = 'logo-image'
            to = '/'
            onClick = { onClick }>
            <img
                alt = { alt }
                src = { src }
            />
        </NavLink>
    );

    const BurgerButton = ({ onClick, className }) => (
        <span
            className = { className }
            onClick = { onClick }>
            <span />
            <span />
            <span />
        </span>
    );

    const classToggle = mobileMenuIsActive
        ? 'navbar-burger is-hidden-tablet is-active'
        : 'navbar-burger is-hidden-tablet';

    return (
        <>
            <header
                className = { `${showMobile ? '' : 'short'} ${mobileSearchIsActive ? 'search-active' : ''}` }>
                <div className = 'container'>
                    <div className = 'columns is-gapless header-top-container'>
                        <div className = 'column is-8'>
                            <TopMenu
                                { ...props }
                                setModalLoginIsOpen = { setModalLoginIsOpen }
                                topMenuItems = { topMenuItems }
                            />
                            <div className = 'columns'>
                                <div className = 'column is-offset-4-desktop is-12 is-8-desktop has-text-centered-mobile is-paddingless'>
                                    <div
                                        className = 'phone_mobile'
                                        dangerouslySetInnerHTML = {{ __html: config.config_telephone_header  }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className = 'column is-4-desktop has-text-centered-mobile has-text-right-desktop-only'>
                            <div
                                className = 'work-time'
                                dangerouslySetInnerHTML = {{ __html: config.config_contact_1  }}
                            />
                        </div>
                    </div>
                    <div className = 'columns is-gapless is-mobile header-container'>
                        <div className = 'column is-2-desktop is-2-mobile column-burger is-hidden-tablet'>
                            <BurgerButton
                                className = { classToggle }
                                onClick = { menuToggle }
                            />
                        </div>

                        <div className = 'column is-2-desktop is-2-mobile column-burger is-hidden-tablet'>
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
                                    {window[ currentLang ].login}
                                </span>
                            ) }
                        </div>

                        <div className = 'column is-2-desktop is-4-mobile has-text-centered column-logo'>
                            <Logo
                                alt = 'logo'
                                src = { IS_KTK ? settings.logo_ktk : settings.logo }
                                onClick = { closeAll }
                            />
                        </div>

                        <div className = 'column is-6 has-text-centered is-hidden-mobile'>
                            <div
                                className = 'top-phone'
                                dangerouslySetInnerHTML = {{ __html: config.config_telephone  }}
                            />
                            <div className = 'sm-text'>
                                { window[ currentLang ].multiCanal }
                            </div>
                        </div>
                        <div className = 'column is-4 has-text-right header-block-right'>
                            <span
                                className = 'icon icon-search is-hidden-tablet'
                                onClick = { ()=>setShowMobile(!showMobile) }>
                                <FontAwesomeIcon icon = { faPhoneAlt } />
                            </span>
                            <MultiSearchBox
                                { ...props }
                                className = {
                                    mobileSearchIsActive ? 'search-active' : ''
                                }
                                value = ''
                            />
                            { authorized ? (
                                <WishListIndicator
                                    { ...props }
                                    onClick = { () => compareToggle() }
                                />
                            ) : null }
                            { currentLang === 'ru' ? (
                                <CompareIndicator
                                    { ...props }
                                    compareIsActive = { compareIsActive }
                                    onClick = { () => compareToggle() }
                                />
                            ) : null }
                            <CartIndicator
                                { ...props }
                                cartIsActive = { cartIsActive }
                                onClick = { () => cartToggle() }
                            />
                            <div
                                className = { `${showMobile ? 'opened' : ''} ${ cartIsActive ? 'mini-cart-open' : ''}` }>
                                <Cart
                                    { ...props }
                                    cartIsActive = { cartIsActive }
                                    cartToggle = { cartToggle }
                                />
                            </div>
                            <div
                                className = { `${showMobile ? 'opened' : ''} ${ compareIsActive ? 'mini-cart-open' : ''}` }>
                                <CompareMenu
                                    { ...props }
                                    compareToggle = { compareToggle }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'primary-nav-wrap'>
                    <div className = 'container'>
                        <div className = 'primary-nav is-hidden-mobile'>
                            <HeadMenu
                                { ...props }
                                categories = { categories }
                                isMobile = { false }
                            />
                        </div>
                    </div>
                </div>
            </header>
            <div
                className = {
                    mobileMenuIsActive || cartIsActive || compareIsActive
                        ? 'dark-overflow'
                        : ''
                }
                onClick = { () => closeAll() }
            />
            <div
                className = { `${showMobile ? 'opened' : ''} mobile-nav is-hidden-tablet${ mobileMenuIsActive ? ' mobile-nav-open' : ''}` }>
                <HeadMenu
                    { ...props }
                    isMobile
                    categories = { categories }
                    topMenuItems = { topMenuItems }
                    onClick = { () => menuClose() }
                />
            </div>
            { modalLoginIsOpen ? (
                <Login
                    { ...props }
                    closeModal = { closeModal }
                />
            ) : null }
        </>
    );
};
