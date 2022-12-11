// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { ProductList, ProductFilter, Sort, Pagination, CategoriesList } from '../../components';
import { getCategoryBySlug, getQueryStringValue, sanitizeSearch } from '../../lib/helper';
import Breadcrumbs from './breadcrumbs';
import { api } from '../../Api';

export const Category = (props) => {
    const { settings, categories, themeSettings, addToCart, setSeoData, user, authorized, isManager, isOpt, cashless, currentLang  } = props;
    const { slug, filter, top, first } = props.match.params;
    const [ productsHasMore, setProductsHasMore ] = useState(false);
    const [ categoryId, setCategoryId ] = useState(0);
    const [ categoryDetails, setCategoryDetails ] = useState({});
    const [ productsAttributes, setProductsAttributes ] = useState([]);
    const [ newQuery, setNewQuery ] = useState(false);
    const [ query, setQuery ] = useState([]);
    const [ queryClear, setQueryClear ] = useState([]);
    const [ brands, setBrands ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ skip, setSkip ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ minMaxPrice, setMinMaxPrice ] = useState([ 0, 0 ]);
    const [ minValue, setMinValue ] = useState(0);
    const [ maxValue, setMaxValue ] = useState(0);
    const [ sort, setSortValue ] = useState(settings.default_product_sorting);
    const [ order, setOrderValue ] = useState(settings.default_product_order);
    const [ loadingMoreProducts, setLoadingMoreProducts ] = useState(false);
    const [ loadingProducts, setLoadingProducts ] = useState(false);
    const [ showFilter, setShowFilter ] = useState(false);
    const products_limit = settings.products_limit;
    const category = getCategoryBySlug(categories, slug);
    const [ isFirstRun, setFirstRun ] = useState(true);
    const [ showSuppliers, setShowSuppliers ] = useState(false);
    const [ children, setChildren ] = useState([]);
    const [ showPriceSlider, setShowPriceSlider ] = useState(false);

    const searchWord = getQueryStringValue('s');
    const sale = getQueryStringValue('sale');

    if (page && page > 1 && (page - 1) * products_limit !== skip) {
        setSkip((page - 1) * products_limit);
    }

    if (filter) {
        const arr = filter.split(',');
        if (arr && arr.length > 0) {
            const ids = arr.map((f) => {
                return Number(f.split('-')[ 1 ]);
            });
            if (ids && ids.length > 0 && brands.length === 0) {
                setBrands(ids);
            }
        }
    }

    if (category && category.id && category.id !== categoryId) {
        setCategoryId(category.id);
        setSkip(0);
        setMinValue(0);
        setMaxValue(0);
        setQuery([]);
        setBrands([]);
        setProductsAttributes([]);
    }

    const products_params = {
        limit:       products_limit,
        category_id: categoryId,
        skip:        skip,
        priceFrom:   0,
        priceTo:     0,
        options:     query,
        brands:      brands,
        sort:        sort,
        order:       order,
        search:      sanitizeSearch(searchWord),
        sale:        sale,
        cashless:    cashless,
    };

    const showBrandsTitle = () => {
        if (brands.length > 0 && categoryDetails) {
            const brandsList = productsAttributes.find((o) => o._id === 'brands');
            if (brandsList && brandsList.values && brandsList.values.length > 0) {
                const selectedBrands = brandsList.values.filter((b) => brands.indexOf(b.value_id) !== -1).map((o) => {
                    return o.name;
                });
                if (selectedBrands && selectedBrands.length > 0) {
                    categoryDetails.name += ': ' + selectedBrands.join(', ');
                }
            }
        }
    };

    if (window.location.hash.indexOf('#options=') !== -1 && window.location.hash !== '#options=') {
        const options = window.location.hash.replace('#options=', '').split('|');
        if (options && options.length > 0) {
            const o = options[ 0 ].split(',').filter((el)=>el);
            if (o && o.length > 0 && query.length === 0) {
                setQuery(o);
            }
        }
        if (options && options.length > 1 && options[ 1 ].indexOf('from=') === -1 && options[ 1 ].indexOf('to=') === -1) {
            const b = options[ 1 ].split(',').map((el)=>{
                return Number(el);
            });
            if (b && b.length > 0 && brands.length === 0) {
                setBrands(b);
            }
        }
    }

    const getHash = (type) => {
        let result = null;
        if (window.location.hash) {
            const options = window.location.hash.split('|');
            if (options && options.length > 0) {
                let value = options.find((el)=>el.indexOf(type) !== -1);
                if (value) {
                    value = value.replace(type + '=', '');
                    result = Number(value);
                }
            }
        }

        return result;
    };

    const setHash = (a, b, prices = [ 0, 0 ]) => {
        const hashFrom = getHash('from');
        const hashTo = getHash('to');
        let hash = a.length > 0 ? 'options=' + a.join(',') : '';
        hash = b.length >  0 && hash === '' ? 'options=' : hash;
        hash = b.length > 0 ? hash + '|' + b.join(',') : hash;
        hash = prices[ 0 ] > 0 ? hash + '|from=' + prices[ 0 ] : hash;
        hash = prices[ 1 ] > 0 ? hash + '|to=' + prices[ 1 ] : hash;
        hash = prices[ 0 ] === 0 && hashFrom ? hash + '|from=' + hashFrom : hash;
        hash = prices[ 1 ] === 0 && hashTo ? hash + '|to=' + hashTo : hash;
        hash = hash === 'options=' ? '' : hash;
        window.location.hash = hash;
    };

    const setPriceHash = (values, min, max) => {
        const b = brands;
        const a = query;
        let prices = [ 0, 0 ];
        const hashFrom = getHash('from');
        const hashTo = getHash('to');

        if (values[ 0 ] !== min) {
            prices[ 0 ] = values[ 0 ];
        } else if (hashFrom) {
            prices[ 0 ] = hashFrom;
        }
        if (values[ 1 ] !== max) {
            prices[ 1 ] = values[ 1 ];
        } else if (hashTo) {
            prices[ 1 ] = hashTo;
        }
        setHash(a, b, prices);
    };

    const setSort = (sort) => {
        const data = sort.split('|');
        setSortValue(data[ 0 ]);
        setOrderValue(data[ 1 ]);
        setNewQuery(!newQuery);
    };

    const setFilterAttribute = (option_id, value_id) => {
        const b = brands;
        const a = query;
        if (option_id === 'brands') {
            b.push(value_id);
            setBrands(b);
            setNewQuery(!newQuery);
        } else {
            a.push(value_id);
            setQuery(a);
            setNewQuery(!newQuery);
        }
        setHash(a, b);
    };
    const unsetFilterAttribute = (option_id, value_id) => {
        let b = brands;
        let a = query;
        if (option_id === 'brands') {
            b = brands.filter((value) => value !== value_id);
            setBrands(b);
            setNewQuery(!newQuery);
        } else {
            a = query.filter((value) => value !== value_id);
            setQuery(a);
            setNewQuery(!newQuery);
        }
        setHash(a, b);
        setQueryClear([ value_id ]);
    };
    const setPriceFromAndTo = (priceFrom, priceTo) => {
        setMinValue(priceFrom);
        setMaxValue(priceTo);
        setNewQuery(!newQuery);
    };

    const getCategoryDetails = async (id) => {
        const data = await api.getCategoryDetails(id);
        if (data) {
            if (data.options && top && first) {
                setShowFilter(true);
                setProductsAttributes(data.options);
            }
            if (data.description) {
                data.description = data.description.split('https://comtrading.ua/image').join('https://img.comtrading.ua/image');
            }
            setCategoryDetails(data);
            showBrandsTitle();
        }
    };

    const getProductsList = async (products_params, loadingMoreProducts, changePrices, user, authorized) => {
        const hashFrom = getHash('from');
        const hashTo = getHash('to');
        products_params.priceFrom = hashFrom ? hashFrom : products_params.priceFrom;
        products_params.priceTo = hashTo ? hashTo : products_params.priceTo;
        const data = await api.getProductsList(products_params, user, authorized);
        setLoadingProducts(false);
        if (data && data.products) {
            if (loadingMoreProducts) {
                setProducts(products.concat(data.products));
            } else {
                setProducts(data.products);
                getCategoryDetails(categoryId);
            }
        } else {
            setProducts([]);
        }
        if (data && typeof data.total !== 'undefined') {
            setTotal(data.total);
            const showMoreBtn = data.total > skip + products_limit;
            if (productsHasMore !== showMoreBtn) {
                setProductsHasMore(showMoreBtn);
            }
        }
        if (changePrices) {
            if (data && data.minPrice && data.maxPrice && data.minPriceCategory && data.maxPriceCategory) {
                const minMaxPrice = [];
                minMaxPrice.push(data.minPriceCategory);
                minMaxPrice.push(data.maxPriceCategory);
                setMinMaxPrice(minMaxPrice);
                setMinValue(data.minPrice);
                setMaxValue(data.maxPrice);
                setShowFilter(true);
            } else {
                setMinMaxPrice([ 0, 0 ]);
            }
        }
        if (loadingMoreProducts) {
            setLoadingMoreProducts(false);
        }
    };

    useEffect(() => {
        const getCategoryChildren = (id) => {
            const items = categories.filter((item)=>item.parent_id === id);
            setChildren(items);
        };
        setLoadingProducts(true);
        if (!loadingMoreProducts) {
            setQuery([]);
            setShowPriceSlider(false);
        }
        if (top && first) {
            getProductsList(products_params, loadingMoreProducts, true, user, authorized);
        } else {
            setShowFilter(false);
            setTotal(0);
            getCategoryChildren(categoryId);
        }
    }, [ categoryId, skip ]);

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(!isFirstRun);
            if (props.match.params.page) {
                setPage(Number(props.match.params.page));
            }

            return;
        }
		SetPage(1)
        if (top && first) {
            getProductsList(products_params, loadingMoreProducts, false, user, authorized);
        }
    }, [ newQuery, cashless ]);

    useEffect(() => {
        const data = {
            title:       currentLang === 'ua' && categoryDetails.name_ua ? categoryDetails.name_ua : categoryDetails.name,
            description: window[ currentLang ].category_description + ' : ✓ ' + (currentLang === 'ua' && categoryDetails.name_ua ? categoryDetails.name_ua : categoryDetails.name) + '.',
            metaTags:    [],
            linkTags:    [],
        };
        setSeoData(data);
    }, [ categoryDetails ]);

    const loadMoreProducts = () => {
        setLoadingMoreProducts(true);
        setSkip(skip + products_limit);
        setPage(page + 1);
    };

    const CategoryHero = ({ categoryDetails }) => (
        <section className = 'hero is-light'>
            <div className = 'hero-body'>
                <div className = 'container'>
                    { currentLang === 'ru' ? (
                        <div
                            className = 'category-description is-hidden-mobile content'
                            dangerouslySetInnerHTML = {{ __html: categoryDetails.description }}
                        />
                    ) : null}
                </div>
            </div>
        </section>
    );

    const getSelectedAttributes = () => {
        let result = [];
        productsAttributes.forEach((attribute) => {
            if (attribute && attribute.values && attribute.values.length > 0) {
                attribute.values.forEach((value) => {
                    if (query.indexOf(value._id) !== -1) {
                        result.push({
                            attributeId: attribute._id,
                            valueId:     value._id,
                            name:        value.name,
                        });
                    }
                });
            }
        });
        if (result.length > 0) {
            return result.map((el) => {
                return (
                    <span
                        className = 'selected_attribute'
                        key = { el.valueId }
                        onClick = { () => unsetFilterAttribute(el.attributeId, el.valueId) }>
                        {el.name}
                    </span>
                );
            });
        }

        return null;
    };

    const clearQuery = () => {
        const toClear = query.concat(brands);
        setQueryClear(toClear);
        setQuery([]);
        setBrands([]);
        setHash([], [], [ 0, 0 ]);
        setNewQuery(!newQuery);
    };

    const selectedOptions = query.length > 0 ? (
        <div className = 'selected_block'>
            { query.length > 0 ? getSelectedAttributes() : null }
            <button
                className = 'selected_attribute'
                onClick = { () => clearQuery() }>
                {window[ currentLang ].clearFilters}
            </button>
        </div>
    ) : null;

    const SetPage = (i) => {
        if (i === 1) {
			var t = new URL(window.location)
			t.pathname = t.pathname.split('/').filter(i=>!/page-\d+/i.test(i)).join('/')
			window.history.replaceState(null, window.title, t)
            setSkip(0);
        }
        if (i > 1) {
            setSkip((i - 1) * products_limit);
        }
        setPage(i);
    };

    return (
        <>
            <section className = 'hero is-light'>
                <div className = 'hero-body'>
                    <div className = 'container'>
                        {themeSettings.show_product_breadcrumbs && (
                            <Breadcrumbs
                                { ...props }
                                categories = { categories }
                                categoryId = { categoryId }
                            />
                        )}
                        <h1 className = 'category-title'>
                            {currentLang === 'ua' && categoryDetails.name_ua ? categoryDetails.name_ua : categoryDetails.name}
                        </h1>
                    </div>
                </div>
            </section>
            <section className = 'section section-category'>
                <div className = 'container'>
                    <div className = 'columns'>
                        {showFilter === true ? (
                            <div className = 'column is-one-quarter left-sidebar'>
                                <ProductFilter
                                    { ...props }
                                    brands = { brands }
                                    category = { category }
                                    clearQuery = { clearQuery }
                                    getHash = { getHash }
                                    maxValue = { maxValue }
                                    minMaxPrice = { minMaxPrice }
                                    minValue = { minValue }
                                    productsAttributes = { productsAttributes }
                                    query = { query }
                                    queryClear = { queryClear }
                                    setFilterAttribute = { setFilterAttribute }
                                    setPriceFromAndTo = { setPriceFromAndTo }
                                    setPriceHash = { setPriceHash }
                                    setShowPriceSlider = { setShowPriceSlider }
                                    setSort = { setSort }
                                    showPriceSlider = { showPriceSlider }
                                    sort = { sort }
                                    unsetFilterAttribute = { unsetFilterAttribute }
                                />
                            </div>
                        ) : null}
                        <div className = 'column'>
                            <div className = 'columns'>
                                <div className = 'column selected'>
                                    { selectedOptions }
                                </div>
                            </div>
                            { top && first ? (
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
                            ) : null}
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
                            {top && first ? (
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
                            ) : (
                                <CategoriesList
                                    { ...props }
                                    items = { children }
                                />
                            )}
                            {total > products_limit ? (
                                <Pagination
                                    { ...props }
                                    limit = { products_limit }
                                    page = { page }
                                    setPage = { SetPage }
                                    total = { total }
                                />
                            ) : null }
                        </div>
                    </div>
                </div>
            </section>
            <CategoryHero
                categoryDetails = { categoryDetails }
            />
        </>
    );
};
