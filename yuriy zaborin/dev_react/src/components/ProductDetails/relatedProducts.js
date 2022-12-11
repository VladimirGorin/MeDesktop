// eslint-disable-line
import React from 'react';
import { CustomProducts } from '../../components';

export const RelatedProducts = (props) => {
    const { ids, settings, addToCart, limit, currentLang } = props;
    const title = window[ currentLang ].relatedProducts;

    return (
        ids && ids.length > 0 ? (
            <section className = 'section section-product-related'>
                <div className = 'container'>
                    <div className = 'title is-4 has-text-centered'>{title}</div>
                    <CustomProducts
                        { ...props }
                        isCentered
                        addToCart = { addToCart }
                        ids = { ids }
                        limit = { limit }
                        settings = { settings }
                        sort = { null }
                    />
                </div>
            </section>
        ) : null
    );
};
