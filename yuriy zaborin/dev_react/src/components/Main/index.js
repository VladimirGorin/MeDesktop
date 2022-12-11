// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { HeadProvider } from 'react-head';
import Cookies from 'js-cookie';
import { book } from '../../lib';
import { api } from '../../Api';
import Wrapper from '../Wrapper';
import { settings, themeSettings } from '../../lib/settings';

export const Main = () => {
    const [ categories, setCategories ] = useState([]);
    const [ config, setConfig ] = useState([]);
    const [ user, setUser ] = useState({});
    const [ authorized, setAuthorized ] = useState(false);
    const [ isManager, setIsManager ] = useState(false);
    const [ isOpt, setIsOpt ] = useState(false);
    const [ isFirstUserRun, setFirstUserRun ] = useState(true);
    const [ isFirstSetLang, setFirstSetLang ] = useState(true);
    const [ go, setGo ] = useState(false);
    const [ isConfig, setIsConfig ] = useState(false);
    const [ rate, setRate ] = useState(1);
    const [ currentLang, setCurrentLang ] = useState('ru');

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 115) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    };

    const ga = 'UA-76310630-1';
    const GA_OPTIONS = process.env.NODE_ENV === 'development' ? {debug: true, testMode: true} : {};

    const getCategoriesList = async () => {
        const data = await api.getCategoriesList();
        if (data) {
            setCategories(data);
            setGo(true);
        }
    };
    const getConfig = async () => {
        const data = await api.getConfig();
        if (data) {
            setConfig(data);
            setIsConfig(true);
        }
    };
    const getRate = async () => {
        const data = await api.getRate();
        if (data && data.rate) {
            setRate(data.rate);
        }
    };

    useEffect(() => {
        if (isFirstUserRun) {
            setFirstUserRun(!isFirstUserRun);

            return;
        }
        if (authorized) {
            const userString = JSON.stringify(user);
            const data = btoa(encodeURIComponent(userString));
            localStorage.setItem('user', data);
        } else {
            localStorage.setItem('user', '');
        }
    }, [ authorized ]);

    useEffect(() => {
        ReactGA.initialize(ga, GA_OPTIONS);
        setFirstUserRun(!isFirstUserRun);
        let language = Cookies.get('cl');
        if (!language) {
            language = 'ua';
        }
        if (language) {
            setCurrentLang(language);
        }
        const data = localStorage.getItem('user');
        try {
            const userString  = decodeURIComponent(atob(data));
            if (userString && userString.length > 0) {
                const user = JSON.parse(userString);
                if (user) {
                    setUser(user);
                    setAuthorized(true);
                    if (user.group && user.group === 2) {
                        setIsManager(true);
                    }
                    if (user.group && user.group === 3) {
                        setIsOpt(true);
                    }
                }
            }
        } catch (error) {
            //
        }
        getCategoriesList();
        getConfig();
        getRate();

        window.addEventListener('scroll', handleScroll);
    }, [ ]);

    useEffect(() => {
        if (isFirstSetLang) {
            setFirstSetLang(!isFirstSetLang);

            return;
        }
        Cookies.set('cl', currentLang);
        getCategoriesList();
        getConfig();
    }, [ currentLang ]);

    const renderComponent = (props, component) => {
        return (
            <Wrapper
                { ...props }
                authorized = { authorized }
                categories = { categories }
                component = { component }
                config = { config }
                currentLang = { currentLang }
                isManager = { isManager }
                isOpt = { isOpt }
                rate = { rate }
                setAuthorized = { setAuthorized }
                setCurrentLang = { setCurrentLang }
                setIsManager = { setIsManager }
                setRate = { setRate }
                setUser = { setUser }
                settings = { settings }
                themeSettings = { themeSettings }
                user = { user }
            />
        );
    };

    return (
        go && isConfig ? (
            <HeadProvider>
                <Router>
                    <Switch>
                        <Route
                            exact
                            strict
                            path = { book.common.home.path }
                            render = { (props) => renderComponent(props, book.common.home.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.common.search.path }
                            render = { (props) => renderComponent(props, book.common.search.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.common.sale.path }
                            render = { (props) => renderComponent(props, book.common.sale.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.common.compare.path }
                            render = { (props) => renderComponent(props, book.common.compare.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.common.wish_list.path }
                            render = { (props) => renderComponent(props, book.common.wish_list.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.account.home.path }
                            render = { (props) => renderComponent(props, book.account.home.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.account.change_account.path }
                            render = { (props) => renderComponent(props, book.account.change_account.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.account.change_password.path }
                            render = { (props) => renderComponent(props, book.account.change_password.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.account.change_address.path }
                            render = { (props) => renderComponent(props, book.account.change_address.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.account.order.path }
                            render = { (props) => renderComponent(props, book.account.order.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.account.orderDetails.path }
                            render = { (props) => renderComponent(props, book.account.orderDetails.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.account.newsletter.path }
                            render = { (props) => renderComponent(props, book.account.newsletter.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.product.home.path }
                            render = { (props) => renderComponent(props, book.product.home.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.product.homeDifferent.path }
                            render = { (props) => renderComponent(props, book.product.homeDifferent.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.checkout.home.path }
                            render = { (props) => renderComponent(props, book.checkout.home.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.checkout.success.path }
                            render = { (props) => renderComponent(props, book.checkout.success.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.mining.home.path }
                            render = { (props) => renderComponent(props, book.mining.home.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.service.path }
                            render = { (props) => renderComponent(props, book.pages.howToBuy.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.howToBuy.path }
                            render = { (props) => renderComponent(props, book.pages.howToBuy.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.contact.path }
                            render = { (props) => renderComponent(props, book.pages.contact.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.warranty.path }
                            render = { (props) => renderComponent(props, book.pages.warranty.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.aboutUs.path }
                            render = { (props) => renderComponent(props, book.pages.aboutUs.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.corporate.path }
                            render = { (props) => renderComponent(props, book.pages.corporate.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.prices.path }
                            render = { (props) => renderComponent(props, book.pages.prices.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.privacy.path }
                            render = { (props) => renderComponent(props, book.pages.privacy.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.publicOffer.path }
                            render = { (props) => renderComponent(props, book.pages.publicOffer.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.pages.suppliers.path }
                            render = { (props) => renderComponent(props, book.pages.suppliers.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.category.topLevel.path }
                            render = { (props) => renderComponent(props, book.category.topLevel.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.category.firstLevel.path }
                            render = { (props) => renderComponent(props, book.category.firstLevel.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.category.secondLevel.path }
                            render = { (props) => renderComponent(props, book.category.secondLevel.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.category.filter.path }
                            render = { (props) => renderComponent(props, book.category.filter.component) }
                        />
                        <Route
                            exact
                            strict
                            path = { book.category.page.path }
                            render = { (props) => renderComponent(props, book.category.page.component) }
                        />

                        <Route
                            render = { (props) => renderComponent(props, book.common.notFound.component) }
                        />
                    </Switch>
                </Router>
            </HeadProvider>
        ) : null
    );
};
