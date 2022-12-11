// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductList, Sort } from '../../components';
import { api } from '../../Api';

export const Sale = (props) => {
    const { settings, categories, addToCart, setSeoData, user, authorized, isManager, isOpt, currentLang  } = props;
    const [ productsHasMore, setProductsHasMore ] = useState(false);
    const [ newQuery, setNewQuery ] = useState(false);
    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ skip, setSkip ] = useState(0);
    const [ sort, setSortValue ] = useState(settings.default_product_sorting);
    const [ order, setOrderValue ] = useState(settings.default_product_order);
    const [ loadingMoreProducts, setLoadingMoreProducts ] = useState(false);
    const [ loadingProducts, setLoadingProducts ] = useState(false);
    const [ saleCategories, setSaleCategories ] = useState([]);
    const products_limit = settings.products_limit;
    const [ showSuppliers, setShowSuppliers ] = useState(false);

    const products_params = {
        limit: products_limit,
        skip:  skip,
        sort:  sort,
        order: order,
    };

    const setSort = (sort) => {
        const data = sort.split('|');
        setSortValue(data[ 0 ]);
        setOrderValue(data[ 1 ]);
        setNewQuery(!newQuery);
    };

    const getSaleList = async (products_params, loadingMoreProducts, user, authorized) => {
        const data = await api.getSaleList(products_params, user, authorized);
        setLoadingProducts(false);
        if (data && data.products) {
            if (loadingMoreProducts) {
                setProducts(products.concat(data.products));
            } else {
                setProducts(data.products);
                if (data.categories) {
                    setSaleCategories(data.categories);
                }
            }
        }
        if (data && typeof data.total !== 'undefined') {
            setTotal(data.total);
            const showMoreBtn = data.total > products_limit;
            if (productsHasMore !== showMoreBtn) {
                setProductsHasMore(showMoreBtn);
            }
        }
        if (loadingMoreProducts) {
            setLoadingMoreProducts(false);
        }
    };

    useEffect(() => {
        setLoadingProducts(true);
        getSaleList(products_params, loadingMoreProducts, user, authorized);
    }, [ skip, newQuery ]);

    useEffect(() => {
        const data = {
            title:       window[ currentLang ].sale_title,
            description: window[ currentLang ].sale_description,
            metaTags:    [],
            linkTags:    [],
        };
        setSeoData(data);
    }, [ ]);

    const loadMoreProducts = () => {
        setLoadingMoreProducts(true);
        setSkip(skip + products_limit);
    };

    const saleCategoriesJSX = () => {
        let categoriesItems = [];
        saleCategories.forEach((sCategory) => {
            categories.forEach((category) => {
                if (sCategory === category.id) {
                    categoriesItems.push({
                        id:   category.id,
                        path: category.path,
                        name: category.name,
                    });
                }
            });
        });

        const items = categoriesItems.map((category) => (
            <NavLink
                activeClassName = 'is-active'
                className = 'is-link'
                key = { category.id }
                to = { `${category.path}?sale=1` }>
                { category.name }
            </NavLink>
        ));

        return (
            <div className = 'column is-one-quarter left-sidebar search_filter'>
                <div className = 'title'>
                    { window[ currentLang ].searchedCategories }
                </div>
                <div className = 'items'>
                    {items}
                </div>
            </div>
        );
    };

    return (
        <>
            <section className = 'hero is-light'>
                <div className = 'hero-body'>
                    <div className = 'container'>
                        <h1 className = 'category-title'>{window[ currentLang ].sale_title}</h1>
                    </div>
                </div>
            </section>
            <section className = 'section section-category'>
                <div className = 'container'>
                    <div className = 'columns'>
                        { saleCategories.length > 0 ? saleCategoriesJSX() : null }
                        <div className = 'column'>
                            <div className = 'columns' style={{display:'none'}}>
                                <div className = 'column'>
                                    <div className = 'sale_slogan'>{window[ currentLang ].sale_slogan}</div>
                                </div>
                            </div>
                            <div className = 'columns'>
                                <div className = 'column total'>
                                    { window[ currentLang ].totalItems }
                                    <span>{total}</span>
                                    {window[ currentLang ].totalItemsSuffix}
                                </div>
                                <div className = 'column is-5'>
                                    <div>
                                        <Sort
                                            { ...props }
                                            currentSort = { sort + '|' + order }
                                            defaultSort = { settings.default_product_sorting }
                                            setSort = { setSort }
                                        />
                                    </div>
                                </div>
                            </div>
                            {isManager && (
                                <div className = 'columns'>
                                    <div className = 'column'>
                                        <span
                                            className = 'show_suppliers'
                                            onClick = { ()=>setShowSuppliers(!showSuppliers) }>
                                            { window[ currentLang ].showSuppliers }
                                        </span>
                                    </div>
                                </div>
                            )}
                            {isOpt && (
                                <div className = 'columns'>
                                    <div className = 'column'>
                                        <span
                                            className = 'show_suppliers'
                                            onClick = { ()=>setShowSuppliers(!showSuppliers) }>
                                            { window[ currentLang ].showOptPrices }
                                        </span>
                                    </div>
                                </div>
                            )}
                            <ProductList
                                { ...props }
                                addToCart = { addToCart }
                                hasMore = { productsHasMore }
                                loadMoreProducts = { loadMoreProducts }
                                loadingMoreProducts = { loadingMoreProducts }
                                loadingProducts = { loadingProducts }
                                products = { products }
                                settings = { settings }
                                showSuppliers = { showSuppliers }
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
