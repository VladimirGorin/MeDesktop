// eslint-disable-line
import React, { useEffect, useState } from 'react';
import { getCategoryById } from '../../lib/helper';
import { api } from '../../Api';
import { CompareSlider } from '../../components';

export const Compare = (props) => {
    const {
        isCentered, className, compareCount, cashless,
        categories, currentLang, compare, addToCart, settings, user, authorized,
    } = props;
    const { category_id } = props.match.params;
    const category = getCategoryById(categories, category_id);
    const [ products, setProducts ] = useState([]);
    const [ attributes, setAttributes ] = useState([]);

    const getAttributes = (products) => {
        let result = [ ];
        if (products.length > 0) {
            products.forEach((product) => {
                if (product.attributes && product.attributes.length > 0) {
                    product.attributes.forEach((attribute) => {
                        if (result.indexOf(attribute.option) === -1) {
                            result.push(attribute.option);
                        }
                    });
                }
            });
            result.sort();
        }

        return result;
    };

    useEffect(() => {
        const ids = compare && compare[ category_id ] ? compare[ category_id ] : [];
        const params = {
            ids:         ids,
            sort:        'id',
            cashless:    cashless,
            category_id: category_id,
            currentLang: currentLang,
        };
        const getProductsList = async (params, user, authorized) => {
            const data = await api.getProductsList(params, user, authorized);
            if (data && data.products) {
                setProducts(data.products);
                const attributes = getAttributes(data.products);
                setAttributes(attributes);
            }
        };
        if (ids.length > 0) {
            getProductsList(params, user, authorized);
        }
    }, [ compareCount, category_id, cashless, currentLang ]);

    const productsJSX = products.length > 0 && attributes.length > 0 ? (
        <CompareSlider
            { ...props }
            isCompare
            addToCart = { addToCart }
            attributes = { attributes }
            className = { className }
            columnCountOnDesktop = { 3 }
            columnCountOnFullhd = { 3 }
            columnCountOnMobile = { 1 }
            columnCountOnTablet = { 2 }
            columnCountOnWidescreen = { 2 }
            hasMore = { false }
            isCentered = { isCentered }
            loadMoreProducts = { null }
            products = { products }
            settings = { settings }
        />

    ) : null;

    const attributesJSX = attributes.map((a, index) => (
        <div
            className = 'attribute-name'
            key = { index }
            title = { a }>
            {a}
        </div>
    ));

    return (
        <>
            <section className = 'hero is-light'>
                <div className = 'hero-body'>
                    <div className = 'container'>
                        <h1 className = 'category-title'>{window[ currentLang ].comparison} {category.name}</h1>
                    </div>
                </div>
            </section>
            <section className = 'section section-category'>
                <div className = 'container'>
                    <div className = 'columns'>
                        <div className = 'column is-one-quarter'>
                            <div className = 'attributes_list'>
                                {attributesJSX}
                            </div>
                        </div>
                        <div className = 'column compared'>
                            {productsJSX}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
