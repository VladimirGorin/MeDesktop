// eslint-disable-line
/* eslint-disable no-extra-parens */
import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import * as Components from '../../components';
import { api } from '../../Api';
import { IS_KTK } from '../../config';

function Wrapper(props) {
    const path = window.location.pathname;
    const { component, user, authorized, rate, setRate, currentLang } = props;
    const [ shippingPrice, setShippingPrice ] = useState(0);
    const [ grandTotal, setGrandTotal ] = useState(0);
    const [ grandTotalUsd, setGrandTotalUsd ] = useState(0);
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ modalLoginIsOpen, setModalLoginIsOpen ] = useState(false);
    const [ modalProduct, setModalProduct ] = useState(0);
    const [ currentPage, setCurrentPage ] = useState('');
    const [ onlyId, setOnlyId ] = useState(false);
    const [ showMobile, setShowMobile ] = useState(false);
    const [ cashless, setCashless ] = useState(IS_KTK);

    const clearCart = {
        items:           [],
        subtotal:        0,
        shipping_total:  0,
        grand_total:     0,
        grand_total_usd: 0,
    };
    const [ isOrder, setIsOrder ] = useState(false);
    const [ mobileMenuIsActive, setMobileMenuIsActive ] = useState(false);
    const [ cartIsActive, setCartIsActive ] = useState(false);
    const [ compareIsActive, setCompareIsActive ] = useState(false);
    const [ mobileSearchIsActive, setMobileSearchIsActive ] = useState(false);
    const [ cart, setCartItem ] = useState(clearCart);
    const [ compare, setCompare ] = useState({});
    const [ compareItems, setCompareItems ] = useState([]);
    const [ wishList, setWishList ] = useState([]);
    const [ wishListCount, setWishListCount ] = useState(0);
    const [ cartCount, setCartCount ] = useState(0);
    const [ seo, setSeo ] = useState({});
    const [ isFirstRun, setFirstRun ] = useState(true);
    const [ cartIsUpdated, setCartIsUpdated ] = useState(false);
    const [ cartUpdatedProducts, setCartUpdatedProducts ] = useState({});
    const [ compareCount, setCompareCount ] = useState(0);
    const components = {
        Home:                     Components.Home,
        NoMatch:                  Components.NoMatch,
        Category:                 Components.Category,
        ProductDetails:           Components.ProductDetails,
        Checkout:                 Components.Checkout,
        CheckoutSuccessContainer: Components.CheckoutSuccessContainer,
        Page:                     Components.Page,
        Contact:                  Components.Contact,
        Search:                   Components.Search,
        Sale:                     Components.Sale,
        Account:                  Components.Account,
        Compare:                  Components.Compare,
        WishList:                 Components.WishList,
        Prices:                   Components.Prices,
        Mining:                   Components.Mining,
    };
    const ComponentName = components[ component ];

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [ window.location.href ]);

    const openModal = (id) => {
        setModalProduct(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalProduct(0);
        setModalIsOpen(false);
    };

    const cartToggle = () => {
        if (path !== '/checkout/') {
            if (cartIsActive) {
                document.body.classList.remove('noscroll');
            } else {
                document.body.classList.add('noscroll');
            }
            setMobileMenuIsActive(false);
            setCompareIsActive(false);
            setCartIsActive(!cartIsActive);
        }
    };

    const menuToggle = () => {
        if (mobileMenuIsActive) {
            document.body.classList.remove('noscroll');
        } else {
            document.body.classList.add('noscroll');
        }
        setMobileMenuIsActive(!mobileMenuIsActive);
        setCartIsActive(false);
        setCompareIsActive(false);
    };

    const searchToggle = () => {
        setMobileSearchIsActive(!mobileSearchIsActive);
        document.body.classList.toggle('search-active');
    };

    const menuClose = () => {
        setMobileMenuIsActive(false);
        document.body.classList.remove('noscroll');
    };

    const closeAll = () => {
        setMobileMenuIsActive(false);
        setCartIsActive(false);
        setCompareIsActive(false);
        document.body.classList.remove('noscroll');
    };

    const addCartToLocalStorage = () => {
        if (cart && cart.items) {
            const cartString = JSON.stringify(cart);
            const data = btoa(encodeURIComponent(cartString));
            localStorage.setItem('cart', data);
        }
    };

    const cartCounter = () => {
        if (cart && cart.items && cart.items.length > 0) {
            const itemsCount = cart.items.reduce((a, b) => a + b.quantity, 0);
            setCartCount(itemsCount);
        } else {
            setCartCount(0);
        }
    };

    const addCartItem = (item, showCart) => {
        let  newCart = cart;
        const similar  = cart.items.filter((el) => el.id === item.id);
        if (similar && similar.length > 0) {
            newCart.items = cart.items.map((el) => {
                if (el.id === item.id) {
                    el.quantity += item.quantity;
                }

                return el;
            });
        } else {
            newCart.items.push(item);
        }
        newCart.subtotal += item.price_local * item.quantity;
        newCart.grand_total = newCart.subtotal + shippingPrice;
        const subtotalUsd = newCart.subtotal > 0 ? newCart.items.reduce((a, b) => (b.price * b.quantity) + a, 0) : 0;
        newCart.grand_total_usd = subtotalUsd + (shippingPrice / rate);
        setCartItem(newCart);
        addCartToLocalStorage();
        if (showCart) {
            setCartIsActive(true);
        }
        setGrandTotal(newCart.grand_total);
        setGrandTotalUsd(newCart.grand_total_usd);
    };

    const deleteCartItem = (id) => {
        let  newCart = cart;
        newCart.items = cart.items.filter((el) => el.id !== id);
        if (newCart.items && newCart.items.length > 0) {
            newCart.subtotal = newCart.items.reduce((a, b) => (b.price_local * b.quantity) + a, 0);
        } else {
            newCart.subtotal = 0;
        }
        newCart.grand_total = newCart.subtotal + shippingPrice;
        const subtotalUsd = newCart.subtotal > 0 ? newCart.items.reduce((a, b) => (b.price * b.quantity) + a, 0) : 0;
        newCart.grand_total_usd = subtotalUsd + (shippingPrice / rate);
        setCartItem(newCart);
        cartCounter();
        addCartToLocalStorage();
        setGrandTotal(newCart.grand_total);
        setGrandTotalUsd(newCart.grand_total_usd);
    };

    const clearCartItem = () => {
        const  newCart = clearCart;
        setCartItem(newCart);
        cartCounter();
        addCartToLocalStorage();
    };

    const addToCart = (product, quantity, showCart = true) => {
        const item = {
            id:          product.id,
            image:       product.image,
            slug:        product.slug,
            name:        product.name,
            model:       product.model,
            quantity:    quantity,
            price:       product.price,
            price_local: product.price_local,
            category_id: product.category_id,
            useMP:       product.useMP,
            useVi:       !!product.useVi,
            useViRRC:    !!product.useViRRC,
            jan:         product.jan,
        };

        addCartItem(item, showCart);
        cartCounter();
    };

    const updateCart = (cashless = false) => {
        setCartIsUpdated(false);
        if (cart && cart.items && cart.items.length > 0) {
            const ids = cart.items.map((item) => {
                return item.id;
            });

            const params = {
                limit:    ids.length,
                ids:      ids || [],
                cashless: IS_KTK ? IS_KTK : cashless,
            };

            const getRate = async () => {
                const data = await api.getRate();
                if (data && data.rate && data.rate !== rate) {
                    setRate(data.rate);
                }
            };

            const getProductsList = async (params, user, authorized) => {
                const data = await api.getProductsList(params, user, authorized);
                if (data && data.products) {
                    let updatedProducts = {};
                    cart.items.forEach((item) => {
                        data.products.forEach((product) => {
                            if (product.id === item.id && (product.price_local !== item.price_local || product.stock_status_id === 5)) {
                                deleteCartItem(item.id);
                                addToCart(product, item.quantity, false);
                                updatedProducts[ item.id ] = {
                                    old_price:    item.price,
                                    new_price:    product.price,
                                    old_quantity: item.quantity,
                                    new_quantity: product.stock_status_id === 5 ? 0 : item.quantity,
                                };
                            }
                        });
                    });
                    if (cartUpdatedProducts !== updatedProducts) {
                        setCartUpdatedProducts(updatedProducts);
                        setCartIsUpdated(true);
                    }
                }
            };
            getRate();
            getProductsList(params, user, authorized);
        }
    };

    const getArrayFromLocalStorage = (type) => {
        let values = {};
        const data = localStorage.getItem(type);
        try {
            const cartString  = decodeURIComponent(atob(data));
            if (cartString && cartString.length > 0) {
                const cartParsed = JSON.parse(cartString);
                if (cartParsed) {
                    values = cartParsed;
                }
            }
        } catch (error) {
            //
        }

        return values;
    };

    const setSeoData = (value) => {
        setSeo(value);
    };

    const setNewShippingPrice = (value) => {
        setShippingPrice(value);
    };

    const updateCartItemQuantity = (item, quantity) => {
        const qty = Number(quantity);
        if (qty === 0) {
            deleteCartItem(item.id);
        } else if (cart && cart.items && cart.items.length > 0) {
            const  newCart = cart;
            const similar  = cart.items.filter((el) => el.id === item.id);
            if (similar && similar.length > 0) {
                newCart.items = newCart.items.map((el) => {
                    if (el.id === item.id) {
                        el.quantity = qty;
                    }

                    return el;
                });
            } else {
                newCart.items.push(item);
            }
            newCart.subtotal = newCart.items.reduce((a, b) => (b.price_local * b.quantity) + a, 0);
            newCart.grand_total = newCart.subtotal + shippingPrice;
            const subtotalUsd = newCart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
            newCart.grand_total_usd = subtotalUsd + (shippingPrice / rate);
            setCartItem(newCart);
            addCartToLocalStorage();
            cartCounter();
            setGrandTotal(newCart.grand_total);
            setGrandTotalUsd(newCart.grand_total_usd);
        } else {
            setCartItem(clearCart);
            addCartToLocalStorage();
            cartCounter();
            setGrandTotal(0);
            setGrandTotalUsd(0);
        }
    };

    useEffect(() => {
        const newCart = getArrayFromLocalStorage('cart');
        if (newCart && newCart.items && newCart.items.length > 0) {
            setCartItem(newCart);
            setGrandTotal(newCart.grand_total);
            setGrandTotalUsd(newCart.grand_total_usd);
        }
        const newWishList = getArrayFromLocalStorage('wishList');
        if (newWishList && newWishList.length > 0) {
            setWishList(newWishList);
            setWishListCount(newWishList.length);
        }
        const newCompare = getArrayFromLocalStorage('compare');
        if (newCompare && Object.keys(newCompare).length > 0) {
            setCompare(newCompare);
            let compareItems = [];
            Object.keys(newCompare).forEach((el) => {
                if (newCompare[ el ].length > 0) {
                    compareItems = compareItems.concat(newCompare[ el ]);
                }
            });
            setCompareItems(compareItems);
            setCompareCount(compareItems.length);
        }
    }, [ ]);

    useEffect(() => {
        cartCounter();
    }, [ cart ]);

    useEffect(() => {
        setCurrentPage(props.location.pathname);
    }, [ props.location.pathname ]);

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(!isFirstRun);

            return;
        }
        const newCart = cart;
        newCart.subtotal = newCart.items.reduce((a, b) => (b.price_local * b.quantity) + a, 0);
        const grand_total = newCart.subtotal + shippingPrice;
        const subtotalUsd = newCart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
        const grand_total_usd = subtotalUsd + (shippingPrice / rate);
        setGrandTotal(grand_total);
        setGrandTotalUsd(grand_total_usd);
    }, [ shippingPrice ]);

    useEffect(() => {
        if (isOrder) {
            clearCartItem();
            cartCounter();
            localStorage.setItem('cart', null);
            setIsOrder(false);
            props.history.push('/success/');
        }
    }, [ isOrder ]);

    const createOrder = (values) => {
        if (values.shippingMethod === 'free.courier') {
            let address = [];
            if (values.NPStreet) {
                address.push(values.NPStreet);
            }
            if (values.NPHouse) {
                address.push(window[ currentLang ].house + ': ' + values.NPHouse);
            }
            if (values.NPRoom) {
                address.push(window[ currentLang ].room + ': ' + values.NPRoom);
            }
            values.address_1 = address.join(', ');
        }
        if (cart && cart.items && values) {
            let order = {
                cart:          cart,
                checkout:      values,
                number:        0,
                shippingPrice: shippingPrice,
                grandTotal:    grandTotal,
                grandTotalUsd: grandTotalUsd,
                oneClick:      false,
                rate:          rate,
                user:          user,
            };
            const createNewOrder = async (order) => {
                const result = await api.createOrder(order);
                if (result && result.order_id) {
                    order.number = result.order_id;
                    const orderString = JSON.stringify(order);
                    const data = btoa(encodeURIComponent(orderString));
                    localStorage.setItem('order', data);
                    setIsOrder(true);
                    setShippingPrice(0);
                    setGrandTotal(0);
                    setGrandTotalUsd(0);
                }
            };
            createNewOrder(order);
        }
    };

    const addCompareToLocalStorage = () => {
        if (compare) {
            const cartString = JSON.stringify(compare);
            const data = btoa(encodeURIComponent(cartString));
            localStorage.setItem('compare', data);
        }
    };
    const addWishListToLocalStorage = () => {
        const cartString = JSON.stringify(wishList);
        const data = btoa(encodeURIComponent(cartString));
        localStorage.setItem('wishList', data);
    };

    const compareToggle = () => {
        if (compareIsActive) {
            document.body.classList.remove('noscroll');
        } else {
            document.body.classList.add('noscroll');
        }
        setCompareIsActive(!compareIsActive);
        setMobileMenuIsActive(false);
        setCartIsActive(false);
    };

    const addToCompare = (item) => {
        let newCompare = compare;
        let newCompareItems = compareItems;
        if (item && item._id && item.category_id) {
            if (!newCompare[ item.category_id ]) {
                newCompare[ item.category_id ] = [];
            }
            if (newCompare[ item.category_id ].indexOf(item.id) === -1) {
                newCompare[ item.category_id ].push(item.id);
                setCompare(newCompare);
            }
            if (newCompareItems.indexOf(item.id) === -1) {
                newCompareItems.push(item.id);
                setCompareItems(newCompareItems);
                setCompareCount(newCompareItems.length);
            }
        }
    };
    const addToWishList = (item) => {
        let newWishList = wishList;
        if (item && item.id) {
            if (!newWishList) {
                newWishList = [];
            }
            if (newWishList.indexOf(item.id) === -1) {
                newWishList.push(item.id);
            } else {
                newWishList = newWishList.filter((el)=>el !== item.id);
            }
            setWishList(newWishList);
            setWishListCount(newWishList.length);
        }
    };

    const deleteCompareItem = (id) => {
        if (compare && Object.keys(compare).length > 0) {
            let newCompare = {};
            let compareItems = [];
            Object.keys(compare).forEach((el) => {
                if (el !== id) {
                    newCompare[ el ] = compare[ el ];
                    if (compare[ el ].length > 0) {
                        compareItems = compareItems.concat(newCompare[ el ]);
                    }
                }
            });
            setCompare(newCompare);
            setCompareItems(compareItems);
            setCompareCount(compareItems.length);
        }
    };

    const removeFromCompare = (item) => {
        if (item && item._id && item.category_id) {
            const category_id = item.category_id;
            const id = item.id;
            if (compare && Object.keys(compare).length > 0) {
                let newCompare = {};
                let compareItems = [];
                Object.keys(compare).forEach((el) => {
                    if (Number(el) === category_id && compare[ el ].length > 0) {
                        let newItems = compare[ el ].filter((it) => it !== id);
                        compare[ el ] = newItems;
                    }
                    newCompare[ el ] = compare[ el ];
                    if (compare[ el ].length > 0) {
                        compareItems = compareItems.concat(newCompare[ el ]);
                    }
                });
                setCompare(newCompare);
                setCompareItems(compareItems);
                setCompareCount(compareItems.length);
            }
        }
    };
    const removeFromWishList = (item) => {
        if (item && item.id) {
            const id = item.id;
            if (wishList && wishList.length > 0) {
                let newWishList = [];
                wishList.forEach((el) => {
                    if (Number(el) && id !== Number(el)) {
                        let newItems = wishList.filter((it) => it !== id);
                        newWishList = newItems;
                    }
                });
                setWishList(newWishList);
                setWishListCount(newWishList.length);
            }
        }
    };
    useEffect(() => {
        addCompareToLocalStorage();
    }, [ compareCount ]);

    useEffect(() => {
        addWishListToLocalStorage();
    }, [ wishListCount ]);

    return (
        <Components.ScrollToTop { ...props }>
            <Components.MetaTags data = { seo } />
            <Components.Header
                { ...props }
                cart = { cart }
                cartCount = { cartCount }
                cartIsActive = { cartIsActive }
                cartToggle = { cartToggle }
                cashless = { cashless }
                closeAll = { closeAll }
                compare = { compare }
                compareCount = { compareCount }
                compareIsActive = { compareIsActive }
                compareItems = { compareItems }
                compareToggle = { compareToggle }
                currentPage = { currentPage }
                deleteCartItem = { deleteCartItem }
                deleteCompareItem = { deleteCompareItem }
                menuClose = { menuClose }
                menuToggle = { menuToggle }
                mobileMenuIsActive = { mobileMenuIsActive }
                mobileSearchIsActive = { mobileSearchIsActive }
                modalLoginIsOpen = { modalLoginIsOpen }
                onlyId = { onlyId }
                searchToggle = { searchToggle }
                setCashless = { setCashless }
                setModalLoginIsOpen = { setModalLoginIsOpen }
                setOnlyId = { setOnlyId }
                setShowMobile = { setShowMobile }
                showMobile = { showMobile }
                updateCartItemQuantity = { updateCartItemQuantity }
                wishList = { wishList }
                wishListCount = { wishListCount }
            />
            {!IS_KTK ? (
                <Components.TopBanner { ...props } />
            ) : null }
            <ComponentName
                { ...props }
                addToCart = { addToCart }
                addToCompare = { addToCompare }
                addToWishList = { addToWishList }
                cart = { cart }
                cartIsUpdated = { cartIsUpdated }
                cartUpdatedProducts = { cartUpdatedProducts }
                cashless = { cashless }
                closeModal = { closeModal }
                compare = { compare }
                compareCount = { compareCount }
                compareItems = { compareItems }
                createOrder = { createOrder }
                grandTotal = { grandTotal }
                modalIsOpen = { modalIsOpen }
                modalLoginIsOpen = { modalLoginIsOpen }
                modalProduct = { modalProduct }
                onlyId = { onlyId }
                openModal = { openModal }
                removeFromCompare = { removeFromCompare }
                removeFromWishList = { removeFromWishList }
                rate = { rate }
                setModalLoginIsOpen = { setModalLoginIsOpen }
                setNewShippingPrice = { setNewShippingPrice }
                setOnlyId = { setOnlyId }
                setSeoData = { setSeoData }
                shippingPrice = { shippingPrice }
                showMobile = { showMobile }
                updateCart = { updateCart }
                updateCartItemQuantity = { updateCartItemQuantity }
                wishList = { wishList }
                wishListCount = { wishListCount }
            />
            <Components.Footer { ...props } />
        </Components.ScrollToTop>
    );
}
export default Components.withProfile(Wrapper);
