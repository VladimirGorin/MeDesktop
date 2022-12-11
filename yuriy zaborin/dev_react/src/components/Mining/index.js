// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import Breadcrumbs from './breadcrumbs';
import { ProductSlider } from '../../components';
import { api } from '../../Api';

export const Mining = (props) => {
    const { themeSettings, currentLang, setSeoData, user, authorized, cashless, addToCart,
        columnCountOnDesktop, columnCountOnFullhd, columnCountOnMobile, columnCountOnTablet, columnCountOnWidescreen,
        className, settings } = props;
    const [ mining, setMining ] = useState(null);
    const [ active, setActive ] = useState(null);

    useEffect(() => {
        const data = {
            title:       window[ currentLang ].mining,
            description: 'Интернет-магазин Comtrading.ua заказать товары из : ✓ ' + window[ currentLang ].mining + '.',
            metaTags:    [],
            linkTags:    [],
        };
        setSeoData(data);

        const getApiData = async (user, authorized, cashless) => {
            const data = await api.getMining(user, authorized, cashless);
            if (data && data.length > 0) {
                setMining(data);
            } else {
                setMining(null);
            }
        };
        getApiData(user, authorized, cashless);
    }, [ ]);

    const handle = (id) =>{
        const button = document.getElementById('block_' + id);
        if (button) {
            setActive(id);
            const top = button.offsetTop;
            if (top) {
                animateScroll.scrollTo(top, {duration: 500});
            }
        }
    };

    const categoriesList = mining ? mining.map((item, index)=>{
        return (
            <div
                className = { `mining-item ${item.cat_id === active ? 'active' : ''}` }
                key = { index }
                onClick = { () => handle(item.cat_id) } >
                {currentLang === 'ua' && item.title_ua ? item.title_ua : item.title}
            </div>
        );
    }) : null;

    const categories = mining ? mining.map((item, index)=>{
        return (
            <div
                className = 'mining-block'
                id = { `block_${item.cat_id}` }
                key = { index }>
                <h2>{currentLang === 'ua' && item.title_ua ? item.title_ua : item.title}</h2>
                <ProductSlider
                    { ...props }
                    fixedRowCount
                    isCentered
                    addToCart = { addToCart }
                    className = { className }
                    columnCountOnDesktop = { columnCountOnDesktop }
                    columnCountOnFullhd = { columnCountOnFullhd }
                    columnCountOnMobile = { columnCountOnMobile }
                    columnCountOnTablet = { columnCountOnTablet }
                    columnCountOnWidescreen = { columnCountOnWidescreen }
                    products = { item.products }
                    settings = { settings }
                />
            </div>
        );
    }) : null;

    return (
        <>
            <section className = 'hero is-light'>
                <div className = 'hero-body'>
                    <div className = 'container'>
                        {themeSettings.show_product_breadcrumbs && (
                            <Breadcrumbs { ...props }/>
                        )}
                        <h1 className = 'category-title'>{window[ currentLang ].mining}</h1>
                    </div>
                </div>
            </section>
            <section className = 'section section-category'>
                <div className = 'container'>
                    <div className = 'columns'>
                        <div className = 'column is-3 left-sidebar is-hidden-mobile'>
                            {categoriesList}
                        </div>
                        <div className = 'column is-9'>
                            {categories}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
