// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { ProductList, Sort } from '../../components';
import { getQueryStringValue, sanitizeSearch } from '../../lib/helper';
import { api } from '../../Api';

export const Search = (props) => {
    const { settings, addToCart, setSeoData, categories, user, authorized, isManager, onlyId, isOpt, cashless, currentLang } = props;
    const [ productsHasMore, setProductsHasMore ] = useState(false);
    const [ searchWord, setSearchWord ] = useState('');
    const [ searchCategories, setSearchCategories ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ skip, setSkip ] = useState(0);
    const [ sort, setSortValue ] = useState(settings.default_search_sorting);
    const [ order, setOrderValue ] = useState(settings.default_product_order);
    const [ loadingMoreProducts, setLoadingMoreProducts ] = useState(false);
    const [ loadingProducts, setLoadingProducts ] = useState(false);
    const products_limit = settings.products_limit;
    const [ isResult, setIsResult ] = useState(false);
    const [ searchText, setSearchText ] = useState(window[ currentLang ].search);
    const [ showSuppliers, setShowSuppliers ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);
    const word = getQueryStringValue('s');
    if (word && word !== searchWord) {
        setSearchWord(word);
        setSkip(0);
    }

    const searchQuery = {
        query:    sanitizeSearch(searchWord),
        from:     skip,
        size:     products_limit,
        sort:     sort,
        order:    order,
        onlyId:   onlyId,
        cashless: cashless,
    };

    const setSort = (sort) => {
        const data = sort.split('|');
        setSortValue(data[ 0 ]);
        setOrderValue(data[ 1 ]);
        //setProducts([]);
        //setIsResult(false);
        setSkip(0);
    };

    const getProductsList = async (loadingMoreProducts, user, authorized) => {
        setSearchText(window[ currentLang ].search);
        const data = await api.search(searchQuery, user, authorized);
        setLoadingProducts(false);
        setIsResult(true);
        if (data && data.products && data.products.length > 0 && data.total && data.total > 0) {
            if (loadingMoreProducts) {
                setProducts(products.concat(data.products));
            } else {
                setProducts(data.products);
                if (data.search_categories) {
                    if (data.search_categories.length > 1) {
                        setSearchCategories(data.search_categories);
                    } else {
                        const category = categories.find((item) => item.id === data.search_categories[ 0 ].key);
                        if (category && category.path) {
                            const path = category.path + '?s=' + searchWord;
                            setRedirect(path);
                        }
                    }
                }
            }
            setTotal(data.total);
            const showMoreBtn = data.products.length >= products_limit;
            if (productsHasMore !== showMoreBtn) {
                setProductsHasMore(showMoreBtn);
            }
        } else {
            setTotal(0);
            setProducts([]);
            setIsResult(false);
            setSearchText(window[ currentLang ].search_no_items);
        }
        if (loadingMoreProducts) {
            setLoadingMoreProducts(false);
        }
    };

    useEffect(() => {
        if (!loadingMoreProducts) {
            setIsResult(false);
            setSearchCategories([]);
        }
        const data = {
            title:       window[ currentLang ].search + ' - ' + searchWord,
            description: window[ currentLang ].search + ' - ' + searchWord,
            metaTags:    [],
            linkTags:    [],
        };
        setSeoData(data);
        getProductsList(loadingMoreProducts, user, authorized);
    }, [ searchWord, skip, onlyId, cashless ]);

    useEffect(() => {
        const data = {
            title:       window[ currentLang ].search + ' - ' + searchWord,
            description: window[ currentLang ].search + ' - ' + searchWord,
            metaTags:    [],
            linkTags:    [],
        };
        setSeoData(data);
        getProductsList(loadingMoreProducts, user, authorized);
    }, [ sort, order ]);

    const loadMoreProducts = () => {
        setLoadingMoreProducts(true);
        setSkip(skip + products_limit);
    };

    const searchedCategoriesJSX = () => {
        let categoriesItems = [];
        searchCategories.forEach((sCategory) => {
            categories.forEach((category) => {
                if (sCategory.key === category.id) {
                    categoriesItems.push({
                        id:    category.id,
                        path:  category.path,
                        name:  category.name,
                        count: sCategory.doc_count,
                    });
                }
            });
        });

        const items = categoriesItems.map((category) => (
            <NavLink
                activeClassName = 'is-active'
                className = 'is-link'
                key = { category.id }
                to = { `${category.path}?s=${searchWord}` }>
                { `${category.name} (${category.count})`  }
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

    return redirect ? (
        <Redirect to = { redirect } />
    ) : (
        <>
            <section className = 'hero is-light'>
                <div className = 'hero-body'>
                    <div className = 'container'>
                        <h1 className = 'category-title'>{window[ currentLang ].searchResult} - {searchWord}</h1>
                    </div>
                </div>
            </section>
            <section className = 'section section-category'>
                <div className = 'container'>
                    <div className = 'columns'>
                        { isResult && searchCategories.length > 0 ? searchedCategoriesJSX() : null }
                        <div className = 'column'>
                            { isResult ? (
                                <>
                                    <div className = 'columns is-hidden-mobile'>
                                        <div className = 'column total'>
                                            { window[ currentLang ].totalItems }
                                            <span>{total === 10000 ? '> ' + total : total}</span>
                                            {window[ currentLang ].totalItemsSuffix}
                                        </div>
                                        <div className = 'column is-5'>
                                            <div>
                                                <Sort
                                                    { ...props }
                                                    currentSort = { sort + '|' + order }
                                                    defaultSort = { settings.default_search_sorting }
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
                                </>
                            ) : (
                                <div className = 'no-items'>
                                    { searchText }
                                </div>
                            ) }

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
