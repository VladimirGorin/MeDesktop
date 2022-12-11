// eslint-disable-line
import React, { useEffect, useState } from 'react';
import { themeSettings } from '../../lib/settings';
import { api } from '../../Api';
import { HomeSlider, CustomProducts, ViewedProducts } from '../../components';

export const Home = (props) => {
    const { addToCart, settings, setSeoData, config, user, authorized, currentLang } = props;
    const [ homeSlider, setHomeSlider ] = useState([]);
    const [ homeSale, setHomeSale ] = useState([]);

    const products_params = {
        limit:  8,
        random: true,
    };

    useEffect(() => {
        const getSlider = async () => {
            const data = await api.getSlider();
            if (data) {
                setHomeSlider(data);
            }
        };

        const getSaleList = async (products_params, user, authorized) => {
            const data = await api.getSaleList(products_params, user, authorized);
            if (data && data.products) {
                setHomeSale(data.products);
            }
        };

        const data = {
            title:       window[ currentLang ].site_title,
            description: window[ currentLang ].site_description,
            metaTags:    [],
            linkTags:    [],
        };
        getSlider();
        const showSale = config && config.setRasprodazha && config.setRasprodazha === '1';
        if (showSale) {
            getSaleList(products_params, user, authorized);
        }
        setSeoData(data);
    }, [ ]);

    const new_items = config && config.new_items && config.new_items !== '' ? config.new_items.split(',') : [];
    const popular_items = config && config.popular_items && config.popular_items !== '' ? config.popular_items.split(',') : [];
    const home_title = config && config.home_title ? config.home_title : '';
    const home_text = config && config.home_text ? config.home_text : '';

    return (
        <>
            <section className = 'section'>
                <div className = 'container'>
                    <div className = 'columns'>
                        <div className = 'column is-8'>
                            <HomeSlider images = { homeSlider } />
                        </div>
                        <div className = 'column is-4'>
                            <div className = 'list_entry'>
                                <h3>{home_title}</h3>
                                <div dangerouslySetInnerHTML = {{ __html: home_text }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className = 'section'>
                <div className = 'container'>
                    {themeSettings.show_viewed_products && (
                        <ViewedProducts
                            { ...props }
                            addToCart = { addToCart }
                            limit = { 8 }
                            settings = { settings }
                        />
                    )}
                    {homeSale.length > 0 ? (
                        <>
                            <div className = 'title is-4 has-text-centered'>
                                {window[ currentLang ].home_products_sale}
                            </div>
                            <CustomProducts
                                { ...props }
                                addToCart = { addToCart }
                                list = { homeSale }
                                settings = { settings }
                                size = { '212x160' }
                                sku = { themeSettings.home_products_sku }
                                sort = { themeSettings.home_products_sort }
                            />
                        </>
                    ) : null }
                    <div className = 'title is-4 has-text-centered'>
                        {window[ currentLang ].home_products_title}
                    </div>
                    <CustomProducts
                        { ...props }
                        addToCart = { addToCart }
                        ids = { new_items }
                        limit = { themeSettings.home_products_limit }
                        settings = { settings }
                        size = { '212x160' }
                        sku = { themeSettings.home_products_sku }
                        sort = { themeSettings.home_products_sort }
                    />
                    <div className = 'title is-4 has-text-centered'>
                        {window[ currentLang ].popular_products_title}
                    </div>
                    <CustomProducts
                        { ...props }
                        addToCart = { addToCart }
                        ids = { popular_items }
                        limit = { themeSettings.home_products_limit }
                        settings = { settings }
                        size = { '212x160' }
                        sku = { themeSettings.home_products_sku }
                        sort = { themeSettings.home_products_sort }
                    />
                </div>
            </section>
        </>
    );
};
