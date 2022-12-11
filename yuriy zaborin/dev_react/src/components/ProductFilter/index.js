// eslint-disable-line
import React, { useState } from 'react';

import { PriceSlider, AttributeFilter } from '../../components';

export const ProductFilter = (props) => {
    const [ sidebarIsActive, setSidebarIsActive ] = useState(false);

    const {
        settings,
        minMaxPrice,
        productsAttributes,
        currentLang,
        clearQuery,
    } = props;

    const sidebarToggle = () => {
        setSidebarIsActive(!sidebarIsActive);
        document.body.classList.toggle('noscroll');
    };

    const sidebarClose = () => {
        setSidebarIsActive(false);
        document.body.classList.remove('noscroll');
    };

    const sidebarClearAndClose = () => {
        clearQuery();
        setSidebarIsActive(false);
        document.body.classList.remove('noscroll');
    };

    return (
        <div>
            <div className = 'is-hidden-tablet'>
                <button
                    className = 'button is-fullwidth'
                    onClick = { sidebarToggle }>
                    {window[ currentLang ].filterProducts}
                </button>
            </div>

            <div
                className = { sidebarIsActive ? 'modal is-active' : 'is-hidden-mobile' }
                style = {{ zIndex: 101 }}>
                <div
                    className = { sidebarIsActive ? 'dark-overflow' : '' }
                    onClick = { sidebarClose }
                />
                <div className = { sidebarIsActive ? 'modal-content' : '' }>
                    <div className = { sidebarIsActive ? 'box sidebar' : '' }>
                        <div className = 'filter_btns is-hidden-tablet'>
                            <button
                                className = 'button is-cancel'
                                onClick = { sidebarClearAndClose }>
                                {window[ currentLang ].filter_cancel}
                            </button>
                            <button
                                className = 'button is-accept'
                                onClick = { sidebarClose }>
                                {window[ currentLang ].filter_accept}
                            </button>
                        </div>
                        <div className = 'filters'>
                            <PriceSlider
                                { ...props }
                                minMaxPrice = { minMaxPrice }
                                productsMaxValue = { props.maxValue }
                                productsMinValue = { props.minValue }
                                setPriceFromAndTo = { props.setPriceFromAndTo }
                                settings = { settings }
                            />
                            <AttributeFilter
                                { ...props }
                                attributes = { productsAttributes }
                                setFilterAttribute = { props.setFilterAttribute }
                                unsetFilterAttribute = { props.unsetFilterAttribute }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
