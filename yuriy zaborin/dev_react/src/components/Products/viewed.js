// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { CustomProducts } from '../../components';

export const ViewedProducts = (props) => {
    const { product, currentLang, limit, settings, addToCart } = props;
    const [ viewedProducts, setViewedProducts ] = useState([]);

    const getArrayFromLocalStorage = () => {
        let values = [];
        const viewedProducts = localStorage.getItem('viewedProducts');

        try {
            if (viewedProducts && viewedProducts.length > 0) {
                const viewedProductsParsed = JSON.parse(viewedProducts);
                if (Array.isArray(viewedProductsParsed)) {
                    values = viewedProductsParsed;
                }
            }
        } catch (error) {
            //
        }

        return values;
    };

    const addProductIdToLocalStorage = (productId) => {
        if (productId && productId.length > 0) {
            const viewedProducts = getArrayFromLocalStorage();

            if (viewedProducts.includes(productId)) {
                const index = viewedProducts.indexOf(productId);
                viewedProducts.splice(index, 1);
                viewedProducts.push(productId);
            } else {
                viewedProducts.push(productId);
            }

            localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
            setViewedProducts(viewedProducts);
        }
    };

    useEffect(() => {
        const viewedProducts = getArrayFromLocalStorage();
        setViewedProducts(viewedProducts);

        if (product && product.id) {
            addProductIdToLocalStorage(product.id);
        }
    }, []);

    const ids = viewedProducts.length > 0 ? viewedProducts.reverse().slice(0, limit) : [];

    return (
        ids.length > 0 ? (
            <section className = 'section section-product-related'>
                <div className = 'container'>
                    <div className = 'title is-4 has-text-centered'>
                        {window[ currentLang ].recentlyViewed}
                    </div>
                    <CustomProducts
                        { ...props }
                        isCentered
                        addToCart = { addToCart }
                        ids = { ids }
                        limit = { limit }
                        settings = { settings }
                    />
                </div>
            </section>
        ) : null
    );
};
