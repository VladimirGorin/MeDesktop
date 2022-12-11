// eslint-disable-line
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import { ServiceBtn } from '../../components';

export const FooterMenu = (props) => {
    const [ isActive, setIsActive ] = useState(false);

    const isActiveToggle = () => {
        setIsActive(!isActive);
    };

    const { title, items } = props;
    let ulItems = null;

    if (items && items.length > 0) {
        ulItems = items.map((item, index) => (
            <li key = { index }>
                <NavLink to = { item.path || '/' }>{item.name}</NavLink>
            </li>
        ));
    }

    return (
        <div className = 'column is-3'>
            <div
                className = { `is-hidden-tablet footer-title mobile-padding${
                    isActive ? ' footer-menu-open' : ''
                }` }
                onClick = { isActiveToggle }>
                {title}
                <span />
            </div>
            <ul className = 'footer-menu'>{ulItems}</ul>
        </div>
    );
};

export const Footer = (props) => {
    const { config, currentLang } = props;

    const footerMenuItems = [
        {
            name: window[ currentLang ].menu_warranty,
            path: '/warranty/',
        }, {
            name: window[ currentLang ].menu_service,
            path: '/service/',
        }, {
            name: window[ currentLang ].menu_about_us,
            path: '/about_us/',
        }, {
            name: window[ currentLang ].menu_contact,
            path: '/contact/',
        }, {
            name: window[ currentLang ].menu_sale,
            path: '/sale/',
        }, {
            name: window[ currentLang ].menu_privacy,
            path: '/privacy/',
        }, {
            name: window[ currentLang ].menu_public_offer,
            path: '/public-offer/',
        },
    ];

    return (
        <section className = 'section section-footer'>
            <hr />
            <footer>
                <div className = 'container'>
                    <div className = 'content'>
                        <div className = 'columns is-gapless'>
                            <div className = 'column is-3'>
                                <div className = 'mobile-padding'>
                                    <div className = 'social-icons'>
                                        <a
                                            className = 'facebook'
                                            href = 'https://www.facebook.com/comtrading.ua/'
                                            rel = 'noopener noreferrer'
                                            target = '_blank'>&nbsp;
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className = 'column is-3'>
                                <div className = 'mobile-padding'>
                                    <div
                                        className = 'footer-contacts'
                                        dangerouslySetInnerHTML = {{ __html: config.config_open  }}
                                    />
                                </div>
                            </div>
                            <div className = 'column is-2'>
                                <div className = 'mobile-padding'>
                                    <div
                                        className = 'footer-title'>
                                        {window[ currentLang ].contactsFooter}
                                    </div>
                                    <div
                                        className = 'footer-menu'>
                                        <div
                                            className = 'mb15'
                                            dangerouslySetInnerHTML = {{ __html: config.config_telephone_footer  }}
                                        />
                                        <a
                                            className = 'text mb15'
                                            href = { 'mailto:' + config.config_email }>
                                            { config.config_email }
                                        </a>
                                        <ServiceBtn
                                            { ...props }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className = 'column is-1 is-hidden-mobile' />
                            <FooterMenu
                                items = { footerMenuItems }
                                title = { window[ currentLang ].menu }
                            />
                        </div>
                    </div>
                </div>
            </footer>
            <div
                className = 'back_btns'
                onClick = { () => { animateScroll.scrollToTop({duration: 500}); } }>
                <div className = 'to_top'/>
            </div>
        </section>
    );
};
