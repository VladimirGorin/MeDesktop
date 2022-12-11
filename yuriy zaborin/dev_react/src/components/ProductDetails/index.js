// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { InlineShareButtons } from 'sharethis-reactjs';
import ReactGA from 'react-ga';
import { ViewedProducts, RelatedProducts, AddToCartButton, Attributes, OneClickButton, Review, ProductPrices,
    AddToCompareButton, AddToWishListButton, CreditButton, Suppliers, CreditButton2, ProductPricesHistory, Properties } from '../../components';
import { themeSettings } from '../../lib/settings';
import DiscountCountdown from './discountCountdown';
import Breadcrumbs from './breadcrumbs';
import { ItemBigImage } from './itemImage';
import Options from './options';
import Price from './price';
import { Quantity } from './quantity';
import Tags from './tags';
import { api } from '../../Api';
import * as helper from '../../lib/helper';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faCommentDollar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { MPTable } from './mp'

const Description = ({ description }) => (
    <div
        className = 'product-content'
        dangerouslySetInnerHTML = {{ __html: description }}
    />
);

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

export const ProductDetails = (props) => {
    const { settings, categories, addToCart, setSeoData, config, user, authorized, setModalLoginIsOpen,
        isManager, addToCompare, addToWishList, cashless, currentLang, rate } = props;
    const slug = props.match.params.slug;
    const id = props.match.params.id || null;
    const [ selectedOptions, setSelectedOptions ] = useState({});
    const [ product, setProduct ] = useState({});
    const [ review, setReview ] = useState([]);
    const [ fullPath, setFullPath ] = useState(window.location.href);
    const [ selectedVariant, setSelectedVariant ] = useState(null);
    const [ isAllOptionsSelected, setIsAllOptionsSelected ] = useState(false);
    const [ showShared, setShowShared ] = useState(false);
    const [ showReview, setShowReview ] = useState(false);
    const [ quantity, setQuantityValue ] = useState(1);
    const [ analysis, setAnalysis ] = useState(null);
    const [ analysisList, setAnalysisList ] = useState(null);
    const [ pricesList, setPricesList ] = useState(null);
    const [ pricesHistory, setPricesHistory ] = useState(null);
    const [ properties, setProperties ] = useState(null);
    const [ propertiesUa, setPropertiesUa ] = useState(null);

    useEffect(() => {
        const getProductDetails = async (slug, user, authorized, cashless) => {
            const data = await api.getProductDetails(slug, user, authorized, cashless);
            if (data) {
                if (data.date_available && data.date_available !== '') {
                    const dateNow = new Date();
                    const dateTo = new Date(data.date_available);
                    if (dateNow >= dateTo) {
                        data.date_available = '';
                    }
                }
                if (data.properties) {
                    setProperties(data.properties);
                }
                if (data.properties_ua) {
                    setPropertiesUa(data.properties_ua);
                }
                setProduct(data);
                setShowShared(true);
                const review = await api.getProductReview(data.id);
                if (review) {
                    setReview(review);
                }
            }
        };
        const product_slug = slug && id ? id + '-prod-' + slug : 'prod-' + slug;
        getProductDetails(product_slug, user, authorized, cashless);
        setFullPath(window.location.href);
        setShowShared(false);
    }, [ slug, cashless ]);

    useEffect(() => {
        const data = {
            title:       product.name,
            description: 'Купить ' + product.name + ' в интернет-магазине  №❶ Comtrading.ua. ✓ Заказать с доставкой по Украине. ✓ Гарантия на товар, ✓ Отзывы. Код ' + product.id,
            metaTags:    [],
            linkTags:    [],
        };
        setSeoData(data);
    }, [ product ]);

    useEffect(() => {
        setAnalysisList([]);
        const getAnalysis = async (analysis) => {
            const data = await api.getAnalysis(analysis);
            if (data && data.length > 0) {
                setAnalysisList(data);
            } else {
                const do_data = [{seller: 'Нет данных'}];
                setAnalysisList(do_data);
            }
        };

        if (analysis) {
            getAnalysis(analysis);
        }
    }, [ analysis ]);

    const findVariantBySelectedOptions = () => {
        const newSelectedOptions = selectedOptions;
        for (const variant of product.variants) {
            const variantMutchSelectedOptions = variant.options.every(
                (varOpt) => newSelectedOptions[ varOpt.option_id ] === varOpt.value_id,
            );
            if (variantMutchSelectedOptions) {
                setSelectedVariant(variant);

                return;
            }
        }
        setSelectedVariant(null);
    };

    const setQuantity = (quantity) => {
        setQuantityValue(quantity);
    };

    const checkSelectedOptions = () => {
        const allOptionsSelected = Object.keys(selectedOptions).length === product.options.length;
        setIsAllOptionsSelected(allOptionsSelected);
    };

    const onOptionChange = (optionId, valueId) => {
        const newSelectedOptions = selectedOptions;

        if (valueId === '') {
            delete newSelectedOptions[ optionId ];
        } else {
            newSelectedOptions[ optionId ] = valueId;
        }

        setSelectedOptions(newSelectedOptions);
        findVariantBySelectedOptions();
        checkSelectedOptions();
    };

    const getProductPrices = async (slug) => {
        const data = await api.getProductPrices(slug);
        if (data) {
            setPricesList(data);
        } else {
            setPricesList(null);
        }
    };

    const getPricesHistory = async (id) => {
        const apiData = {
            product_id: id,
            user:       user,
        };
        const data = await api.getPricesHistory(apiData);
        if (data) {
            setPricesHistory(data);
        } else {
            setPricesHistory(null);
        }
    };

    const pricesListJSX = pricesList && pricesList.etaps && pricesList.etaps.length > 0
        ? (
            <div className = 'pricesListWrap'>
                <h3>
                    Формирование цены:
                    {pricesList.price_local ? (
                        <b>
                            { ' (' }
                            <FormattedCurrency
                                number = { pricesList.price_local }
                                settings = { settings }
                            />
                            {pricesList.price ? (
                                <>
                                    { ' / ' }
                                    <FormattedCurrency
                                        number = { pricesList.price }
                                        settings = {{
                                            decimal_number:     2,
                                            thousand_separator: ' ',
                                            currency_format:    settings.currency_format_usd,
                                        }}
                                    />
                                </>
                            ) : null}
                            { ')' }
                        </b>
                    ) : null}
                </h3>
                <div className = 'pricesList'>
                    {
                        pricesList.etaps.map((item, index) => (
                            <ProductPrices
                                { ...props }
                                item = { item }
                                key = { index }
                            />
                        ))
                    }
                </div>
            </div>
        )
        : null;

    const pricesHistoryJSX = pricesHistory && pricesHistory.length > 0
        ? (
            <div className = 'pricesListWrap'>
                <h3>
                    История цен:
                </h3>
                <div className = 'pricesList'>
                    <div className = 'pricesListRow header'>
                        <div className = 'pricesListItem price'>
                            Цена
                        </div>
                        <div className = 'pricesListItem price'>
                            РРЦ
                        </div>
                        <div className = 'pricesListItem price'>
                            BI
                        </div>
                        <div className = 'pricesListItem price'>
                            BI РРЦ
                        </div>
                        <div className = 'pricesListItem price'>
                            Фикс цена
                        </div>
                        <div className = 'pricesListItem date'>
                            Фикс дата
                        </div>
                        <div className = 'pricesListItem date'>
                            Коммент
                        </div>
                        <div className = 'pricesListItem date'>
                            Дата изменений
                        </div>
                        <div className = 'pricesListItem source'>
                            Источник
                        </div>
                    </div>
                    {
                        pricesHistory.map((item, index) => (
                            <ProductPricesHistory
                                { ...props }
                                item = { item }
                                key = { index }
                            />
                        ))
                    }
                </div>
            </div>
        ) : null;

    const reviewJSX = review && review.length > 0
        ? (
            <>
                <h3>
                    { window[ currentLang ].review_list }
                </h3>
                {
                    review.filter((item) => item.AuthorName).map((item, index) => (
                        <Review
                            { ...props }
                            item = { item }
                            key = { index }
                        />
                    ))
                }
            </>
        )
        : (
            <div className = 'no-items'>
                { window[ currentLang ].review_list_empty }
            </div>
        );

    const maxQuantity = product.stock_quantity ? product.stock_quantity : 100;

    const suppliersJSX = isManager && product.suppliers && product.suppliers.length > 0 ? (
        <>
            <MPTable
                { ...props }
                product = { product }
            />
            { product.mp_last ? (
                <div>Market Place:&nbsp;
                    <b> { product.mp_last } </b>
                </div>
            ) : null }
            { product.price_marg ? (
                <div>{window[ currentLang ].rrc_price}
                    <b>
                        <FormattedCurrency
                            number = { product.price_marg }
                            settings = {{
                                decimal_number:     2,
                                thousand_separator: ' ',
                                currency_format:    settings.currency_format_usd,
                            }}
                        />
                    </b>
                </div>
            ) : null }
            { product.price_full ? (
                <div>
                    {window[ currentLang ].rrc_price_in}
                    <b>
                        <FormattedCurrency
                            number = { product.price_local_full }
                            settings = { settings }
                        /> (
                        <FormattedCurrency
                            number = { product.price_full }
                            settings = {{
                                decimal_number:     2,
                                thousand_separator: ' ',
                                currency_format:    settings.currency_format_usd,
                            }}
                        />
                        )
                    </b>
                </div>
            ) : null }
            { product.fixed_rrc_date && product.fixed_rrc_date > new Date().toISOString() ? (
                <div>
                    {window[ currentLang ].fixed_rrc_date}
                    <b>
                        { moment(product.fixed_rrc_date).format('DD.MM.YYYY') }
                        { ' (' }
                        <FormattedCurrency
                            number = { product.price_local_full_hand }
                            settings = { settings }
                        /> (
                        <FormattedCurrency
                            number = { product.price_full_hand }
                            settings = {{
                                decimal_number:     2,
                                thousand_separator: ' ',
                                currency_format:    settings.currency_format_usd,
                            }}
                        />
                        { ')' }
                        )
                    </b>
                </div>
            ) : null }
            { product.cashless_price ? (
                <div>
                    {window[ currentLang ].cashless_price}
                    <b>
                        <FormattedCurrency
                            number = { product.cashless_price_local }
                            settings = { settings }
                        /> (
                        <FormattedCurrency
                            number = { product.cashless_price }
                            settings = {{
                                decimal_number:     2,
                                thousand_separator: ' ',
                                currency_format:    settings.currency_format_usd,
                            }}
                        />
                        )
                    </b>
                </div>
            ) : null }
            { pricesListJSX }
            { pricesHistoryJSX }
            <div className = 'columns'>
                <div className = 'column is-9 relative'>
                    <div>{window[ currentLang ].suppliers}</div>
                </div>
                <div className = 'column is-1 relative'>
                    <span
                        className = 'analyse_btn'
                        title = 'Анализ цен'
                        onClick = { ()=>setAnalysis(product.id) }>
                        <FontAwesomeIcon icon = { faChartArea } />
                    </span>
                </div>
                <div className = 'column is-1 relative'>
                    <span
                        className = 'analyse_btn'
                        title = 'Формирование цены'
                        onClick = { ()=>getProductPrices(product.slug) }>
                        <FontAwesomeIcon icon = { faCommentDollar } />
                    </span>
                </div>
                <div className = 'column is-1 relative'>
                    <span
                        className = 'analyse_btn'
                        title = 'История цены'
                        onClick = { ()=>getPricesHistory(product.id) }>
                        <FontAwesomeIcon icon = { faChartLine } />
                    </span>
                </div>
            </div>
            <Suppliers
                { ...props }
                product = { product }
            />
            { product.upc ? (
                <div>{window[ currentLang ].fixed_text} <b>{window[ currentLang ].fixed_price}</b></div>
            ) : null }
            { product.date_available && product.date_available !== '' && product.date_available !== '0000-00-00' ? (
                <div>{window[ currentLang ].fixed_available_text} <b>{product.date_available}</b></div>
            ) : null }
        </>
    ) : null;


    const optPricesJSX = product.opt_prices ? (
        <table className = 'suppliers'>
            <tbody>
                { product.opt_prices.cashless ? (
                    <tr
                        className = 'supplier'>
                        <td>{ `${ window[ currentLang ].cashless } (${product.opt_prices.cashless.count})` }</td>
                        <td>${ product.opt_prices.cashless.price }</td>
                    </tr>
                ) : null }
                { product.opt_prices.cash ? (
                    <tr
                        className = 'supplier'>
                        <td>{ `${ window[ currentLang ].cash } (${product.opt_prices.cash.count})` }</td>
                        <td>${ product.opt_prices.cash.price }</td>
                    </tr>
                ) : null }
            </tbody>
        </table>
    ) : null;

    const toggleReview = (status) => {
        if (status) {
            ReactGA.event({
                category: 'Stats',
                action:   'Product review',
                value:    product.id,
            });
        }
        setShowReview(status);
    };

    const analysisListJSX = analysisList && analysisList.length > 0 ? analysisList.map((item, index)=>{
        return (
            <div
                className = 'analysis_item'
                key = { index }>
                <div className = 'seller'>{item.seller}</div>
                {item.price ? (
                    <div className = 'price'>
                        <FormattedCurrency
                            number = { item.price }
                            settings = { settings }
                        />
                    </div>
                ) : null}
                {item.dt ? (
                    <div className = 'dt'>
                        { moment(item.dt).format('DD.MM.YYYY HH:mm') }
                    </div>
                ) : null}
            </div>
        );
    }) : null;

    const getWarrantyText = () => {
        let text = config.config_description_garantija;
        if (product && product.jan) {
            const jan = helper.getWarranty(product.jan, currentLang);
            text = text.replace(/<!-- -->[\W ]+<!-- -->/, jan);
        }

        return text;
    };

    return (
        product ? (
            <>
                <section className = { `${isManager ? 'manager' : ''} section section-product` }>
                    <div className = 'container'>
                        {themeSettings.show_product_breadcrumbs && (
                            <Breadcrumbs
                                { ...props }
                                categories = { categories }
                                product = { product }
                            />
                        )}
                        <div className = 'columns'>
                            <div className = 'column is-6 relative'>
                                { product.sale && product.stock_status_id > 5 ? (
                                    <div className = 'sale_label'>{ window[ currentLang ].best_price }</div>
                                ) : null}
                                { product.upc === '1' ? (
                                    <div className = 'sale_label'>{ window[ currentLang ].best_price }</div>
                                ) : null}
                                {suppliersJSX}
                                {optPricesJSX}
                                {analysisListJSX ? (
                                    <div className = 'analysis'>
                                        {analysisListJSX}
                                    </div>
                                ) : null}
                                <ItemBigImage
                                    alt = { product.name }
                                    image = { product.image }
                                />
                            </div>
                            <div className = 'column is-6'>
                                <div className = 'content'>
                                    <Tags tags = { product.tags } />
                                    <h1 className = 'title is-4 product-name'>
                                        {currentLang === 'ua' && product.name_ua ? product.name_ua : product.name}
                                    </h1>
                                    <div className = 'codes'>
                                        <div className = 'product-code'>{window[ currentLang ].model} <span>{helper.refProductCode(product)}</span></div>
                                        <div className = 'product-model'>{window[ currentLang ].product_model} <span>{product.model}</span></div>
                                    </div>
                                    <Price
                                        { ...props }
                                        isManager = { isManager }
                                        product = { product }
                                        settings = { settings }
                                        variant = { selectedVariant }
                                    />
                                    {
                                        themeSettings.show_discount_countdown && product.on_sale === true
                                            ? (
                                                <DiscountCountdown product = { product } />
                                            ) : null
                                    }
                                    <div className = { `stock_status status_${ product.stock_status_id}` }>
                                        { window[ currentLang ][ 'stock_status_' + product.stock_status_id ] }
                                    </div>
                                    <Options
                                        options = { product.options }
                                        onChange = { onOptionChange }
                                    />
                                    { product.stock_status_id === 7 || product.stock_status_id === 6 ? (
                                        <Quantity
                                            { ...props }
                                            maxQuantity = { maxQuantity }
                                            quantity = { quantity }
                                            onChange = { setQuantity }
                                        />
                                    ) : null }
                                    <div className = 'WishList'>

                                        { product.stock_status_id === 7 || product.stock_status_id === 6 ? (
                                            <div className = 'button-addtocart'>
                                                <AddToCartButton
                                                    { ...props }
                                                    addToCart = { addToCart }
                                                    isAllOptionsSelected = { isAllOptionsSelected }
                                                    product = { product }
                                                    quantity = { quantity }
                                                    variant = { selectedVariant }
                                                />
                                                <AddToCompareButton
                                                    { ...props }
                                                    addToCompare = { addToCompare }
                                                    product = { product }
                                                />
                                            </div>
                                        ) : null }

                                        <AddToWishListButton
                                            { ...props }
                                            addToWishList = { addToWishList }
                                            authorized = { authorized }
                                            product = { product }
                                            setModalLoginIsOpen = { setModalLoginIsOpen }
                                        />
                                    </div>
                                    <div className = 'button-addtocart'>
                                        <OneClickButton
                                            { ...props }
                                            product = { product }
                                            quantity = { quantity }
                                        />
                                    </div>
                                    { product.showCredit ? (
                                        <>
                                            <div className = 'button-addtocart'>
                                                <CreditButton
                                                    { ...props }
                                                    product = { product }
                                                />
                                            </div>
                                            <div className = 'button-addtocart'>
                                                <CreditButton2
                                                    { ...props }
                                                    product = { product }
                                                />
                                            </div>
                                        </>
                                    ) : null }
                                    { product.action_text && product.action_text !== '' ? (
                                        <div className = 'product_action'>
                                            <h5>{ window[ currentLang ].actionTitle }</h5>
                                            <div dangerouslySetInnerHTML = {{ __html: currentLang === 'ua' && product.action_text_ua ? product.action_text_ua : product.action_text  }}/>
                                        </div>
                                    ) : null }
                                    <div className = 'product_phones'>
                                        <p className = 'phones_label'>{ window[ currentLang ].phones_label }</p>
                                        <p dangerouslySetInnerHTML = {{ __html: config.config_telephone_text  }}/>
                                    </div>
                                    <div dangerouslySetInnerHTML = {{ __html: getWarrantyText() }}/>
                                    { showShared ? (
                                        <InlineShareButtons
                                            config = {{
                                                alignment: 'left',  // alignment of buttons (left, center, right)
                                                color:     'social',      // set the color of buttons (social, white)
                                                enabled:   true,        // show/hide buttons (true, false)
                                                font_size: 14,        // font size for the buttons
                                                labels:    'cta',        // button labels (cta, counts, null)
                                                language:  'en',       // which language to use (see LANGUAGES)
                                                networks:  [           // which networks to include (see SHARING NETWORKS)
                                                    'facebook',
                                                    'twitter',
                                                    'email',
                                                ],
                                                padding:    12,          // padding within buttons (INTEGER)
                                                radius:     4,            // the corner radius on each button (INTEGER)
                                                show_total: false,
                                                size:       30,             // the size of each button (INTEGER)

                                                // OPTIONAL PARAMETERS
                                                url:   fullPath, // (defaults to current url)
                                                image: product.image,  // (defaults to og:image or twitter:image)
                                                title: product.name,            // (defaults to og:title or twitter:title)
                                            }}
                                        />
                                    ) : null }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className = 'section section-product-description-tabs'>
                    <div className = 'container'>
                        <div className = 'content'>
                            <div className = 'columns'>
                                <div className = 'column'>
                                    <div className = 'tabs'>
                                        <div
                                            className = { showReview ? 'tab features' : 'tab features active' }
                                            onClick = { () => toggleReview(false) }>
                                            <span className = 'icon'></span>{ window[ currentLang ].description }
                                        </div>
                                        { showReview ? (
                                            <div
                                                className = { showReview ? 'tab review active' : 'tab review' }
                                                onClick = { () => toggleReview(true) }>
                                                <span className = 'icon'></span>{ window[ currentLang ].review }
                                            </div>
                                        ) : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = 'section section-product-description'>
                    <div className = 'container'>
                        <div className = 'content'>
                            <div className = 'columns'>
                                { showReview ? (
                                    <div className = 'column'>
                                        <div className = 'reviews_list'>
                                            { reviewJSX }
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className = 'column is-7'>
                                            <Description description = { currentLang === 'ua' ? product.description_ua : product.description } />
                                        </div>
                                        <div className = 'column is-5'>
                                            <Attributes
                                                { ...props }
                                                attributes = { product.attributes }
                                            />
                                            <Properties
                                                { ...props }
                                                list = { currentLang === 'ua' ? propertiesUa : properties }
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <RelatedProducts
                    { ...props }
                    addToCart = { addToCart }
                    ids = { product.related_product_ids }
                    limit = { 10 }
                    settings = { settings }
                />

                {themeSettings.show_viewed_products && (
                    <ViewedProducts
                        { ...props }
                        addToCart = { addToCart }
                        limit = { themeSettings.limit_viewed_products || 4 }
                        product = { product }
                        settings = { settings }
                    />
                )}
            </>
        ) : null
    );
};
