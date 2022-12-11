// eslint-disable-line
import React, { useState, useEffect, useRef } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { InputField } from './inputField';
import { RadioButton } from './RadioButton';
import { Agreement } from './Agreement';
import { CheckoutDelivery } from './delivery';
import { animateScroll } from 'react-scroll';
import InputMask from 'react-input-mask';
import moment from 'moment';
import * as helper from '../../lib/helper';
import { api } from '../../Api';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

export const CheckoutStepContacts = (props) => {
    const { createOrder, currentLang,
        settings, setNewShippingPrice, mustDeleteItem, user, authorized, updateCart, cartIsUpdated, cartUpdatedProducts, config,
        paymentMethod, shippingMethod, setShippingMethod, isManager, isCargo }  = props;
    const [ hidden, setHidden ] = useState(shippingMethod);
    const [ orderValues, setOrderValues ] = useState({});
    const [ userData, setUserData ] = useState({});
    const [ usersList, setUsersList ] = useState([]);
    const [ usersNotFound, setUsersNotFound ] = useState(false);
    const [ userOrders, setUserOrders ] = useState([]);
    const [ userOrdersNotFound, setUserOrdersNotFound ] = useState(false);
    const [ isSend, setIsSend ] = useState(false);
    const [ showHistoryBtn, setShowHistoryBtn ] = useState(false);
    const [ isEntity, setIsEntity ] = useState(false);
    const refName = useRef(null);
    const refPhone = useRef(null);

    const nameYup = Yup.string()
            .trim()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
    const nameYupReq = Yup.string()
            .trim()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required)
    const selectedYup = Yup.string()
            .required(window[ currentLang ].errors_required)
    const addressYup = Yup.string()
            .trim()
            .min(10, window[ currentLang ].errors_toShort)
//            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required)
    const mobileYup = Yup.string()
            .matches(/([0-9-+()]{16})/, window[ currentLang ].errors_mobile)
            .min(16, window[ currentLang ].errors_toShort)
            .max(16, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required)
    const emailYup = Yup.string()
            .email(window[ currentLang ].errors_email)
//            .required(window[ currentLang ].errors_required),
    const user_agreementYup = Yup.boolean()
            .oneOf([ true ], 'Must Accept Terms and Conditions')
    const MiniSignupSchema = Yup.object().shape({
        firstName: nameYupReq,
        lastName: nameYup,
        middleName: nameYup,
        email: emailYup,
        mobile: mobileYup,
        user_agreement: user_agreementYup
    });

    const SignupSchema = Yup.object().shape({
        firstName: nameYupReq,
        lastName: nameYupReq,
        middleName: nameYupReq,
        email: emailYup,
        mobile: mobileYup,
        user_agreement: user_agreementYup
    });

    const ManagerSignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        lastName: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong),
        mobile: Yup.string()
            .matches(/([0-9-+()]{16})/, window[ currentLang ].errors_mobile)
            .min(16, window[ currentLang ].errors_toShort)
            .max(16, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        email: Yup.string()
            .email(window[ currentLang ].errors_email),
        user_agreement: Yup.boolean()
            .oneOf([ true ], 'Must Accept Terms and Conditions'),
    });
    const chooseSchema = (sm) => {
      sm = sm || shippingMethod
      if (isManager)
        return ManagerSignupSchema
      if (sm === 'pickup.pickup')
        return MiniSignupSchema
      const base = SignupSchema
      if (sm === 'citylink.citylink')
        return base.shape({ address_1: addressYup })
      const next = base.shape({ NPArea: selectedYup, NPCity: selectedYup, })
      if (sm === 'free.free')
        return next.shape({ NPWarehouse: selectedYup, })
      return next.shape({ NPStreet: selectedYup, NPHouse: selectedYup, })
    }
    const [validationSchema, setValidationSchema] = useState(chooseSchema())

    const clearSearch = () =>{
        setUsersNotFound(false);
        setUsersList([]);
        setShowHistoryBtn(false);
        setUserOrders([]);
        setUserOrdersNotFound(false);
    };

    const searchUser = async () => {
        clearSearch();
        const searchData = {
            name:  refName.current.value,
            phone: refPhone.current.value,
        };
        const data = await api.searchUser(searchData);
        if (data && data.length > 0) {
            setUsersList(data);
        } else {
            setUsersNotFound(true);
        }
    };

    const onClick = (event) => {
        const target = event.currentTarget;
        setHidden(target.id);
        setShippingMethod(target.id);
        const price = settings.shippingMethodPrice[ target.id ];
        if (typeof price !== 'undefined') {
            setNewShippingPrice(price);
        }
        setValidationSchema(chooseSchema(target.id))
    };

    const checkOrder = (values) => {
        updateCart();
        setOrderValues(values);
    };

    useEffect(() => {
        if (cartIsUpdated &&  Object.keys(cartUpdatedProducts).length === 0 && Object.keys(orderValues).length > 0) {
            createOrder(orderValues);
            setOrderValues({});
        } else if (Object.keys(cartUpdatedProducts).length > 0) {
            animateScroll.scrollToTop({duration: 100});
        }
    }, [ cartIsUpdated ]);

    const setUser = (userData) =>{
        clearSearch();
        setUserData({
            id:        userData.customer_id ? userData.customer_id : 0,
            firstName: userData.firstname ? userData.firstname : '',
            lastName:  userData.lastname ? userData.lastname : '',
            middleName:userData.middlename ? userData.middlename : '',
            email:     userData.email ? userData.email : '',
            mobile:    userData.telephone ? userData.telephone : '',
            address_1: userData.address && userData.address.address_1 ? userData.address.address_1 : '',
            city:      userData.address && userData.address.city ? userData.address.city : '',
            npOffice:  userData.address && userData.address.address_1 ? userData.address.address_1 : '',
        });
        setShowHistoryBtn(true);
    };

    const userOrdersJSX = userOrders.length > 0 ? userOrders.map((order)=>{
        return (
            <div
                className = 'order_item'
                key = { order.order_id }>
                <div className = 'el half'>
                    <a
                        activeClassName = 'is-active'
                        href = { `http://178.128.193.106:4600/order/${order.order_id}/view` }
                        rel = 'noopener noreferrer'
                        target = '_blank'>
                        {order.order_id}
                    </a>
                </div>
                <div className = 'el double'>
                    {order.order_status}
                </div>
                <div className = 'el'>
                    { moment(order.createdAt).format('DD.MM.YYYY') }
                </div>
                <div className = 'el half'>
                    {order.products}
                </div>
                <div className = 'el double'>
                    {order.client}
                </div>
                <div className = 'el'>
                    <FormattedCurrency
                        number = { order.total }
                        settings = { settings }
                    />
                </div>
            </div>
        );
    }) : null;

    const usersListJSX = usersList.length > 0 ? usersList.map((item)=>{
        return (
            <div
                className = 'userItem'
                key = { item._id }
                onClick = { ()=>setUser(item) }>
                {`${item.firstname} ${item.lastname} ${item.telephone}`}
            </div>
        );
    }) : null;

    const onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13 && isManager) {
            keyEvent.preventDefault();
        }
    };

    const showHistory = async () => {
        setUserOrders([]);
        setUserOrdersNotFound(false);
        if (userData && userData.id) {
            const props = {
                manager:     isManager ? user : null,
                customer_id: userData.id,
                user:        userData,
            };
            const data = await api.getAccountOrders(props);
            if (data && data.orders && data.orders.length > 0) {
                setUserOrders(data.orders);
            } else {
                setUserOrdersNotFound(true);
            }
        }
    };

    return (
        <div className = { `${usersListJSX ? 'searchResults' : ''} checkout-step` }>
            <Formik
                initialValues = {{
                    firstName:        authorized && !isManager ? user.firstname : '',
                    lastName:         authorized && !isManager ? user.lastname : '',
                    middleName:       authorized && !isManager ? user.middlename : '',
                    email:            authorized && !isManager ? user.email : '',
                    mobile:           authorized && !isManager ? user.phone : '',
                    shippingMethod:   shippingMethod,
                    paymentMethod:    paymentMethod,
                    address_1:        '',
                    city:             '',
                    npOffice:         '',
                    user_agreement:   true,
                    usreou:           '',
                    counterpartyName: '',
                    NPArea:           '',
                    NPCity:           '',
                    NPWarehouse:      '',
                    NPStreet:      '',
                    NPHouse:      '',
                }}
                render = { (props) => (
                    <form
                        onKeyDown = { onKeyDown }
                        onSubmit = { props.handleSubmit }>
                        { isManager ? (
                            <>
                                <div className = { `${showHistoryBtn ? 'with_history' : ''} user_search` }>
                                    <input
                                        placeholder = { window[ currentLang ].search_name }
                                        ref = { refName }
                                        type = 'text'
                                    />
                                    <InputMask
                                        mask = '+38(999)999-9999'
                                        maskChar = { '_' }
                                        placeholder = '+38(___)___-____'
                                        ref = { refPhone }
                                        type = 'text'
                                    />
                                    <span
                                        className = 'button'
                                        onClick = { searchUser }>
                                        { window[ currentLang ].search }
                                    </span>
                                    { showHistoryBtn ? (
                                        <span
                                            className = 'button history'
                                            onClick = { showHistory }>
                                            { window[ currentLang ].showHistory }
                                        </span>
                                    ) : null}
                                </div>
                                { usersListJSX ? (
                                    <div className = 'userList'>
                                        <div
                                            className = 'clearSearch'
                                            onClick = { clearSearch }>
                                            <img
                                                alt = { window[ currentLang ].close }
                                                className = 'icon'
                                                src = '/assets/images/close.svg'
                                                title = { window[ currentLang ].close }
                                            />
                                        </div>
                                        { usersListJSX }
                                    </div>
                                ) : null }
                                { usersNotFound ? (
                                    <div className = 'usersNotFound'>
                                        { window[ currentLang ].usersNotFound }
                                    </div>
                                ) : null }
                                { userOrdersJSX ? (
                                    <div className = 'orders searchResults'>
                                        <div className = 'order_item orders_title'>
                                            <div className = 'el half'>
                                                {window[ currentLang ].order}
                                            </div>
                                            <div className = 'el double'>
                                                {window[ currentLang ].orders_status}
                                            </div>
                                            <div className = 'el'>
                                                {window[ currentLang ].orders_date}
                                            </div>
                                            <div className = 'el half'>
                                                {window[ currentLang ].orders_products}
                                            </div>
                                            <div className = 'el double'>
                                                {window[ currentLang ].orders_client}
                                            </div>
                                            <div className = 'el'>
                                                {window[ currentLang ].orders_total}
                                            </div>
                                        </div>
                                        {userOrdersJSX}
                                    </div>
                                ) : null }
                                { userOrdersNotFound ? (
                                    <div className = 'usersNotFound'>
                                        { window[ currentLang ].userOrdersNotFound }
                                    </div>
                                ) : null }
                            </>
                        ) : null }
                        <div className = 'block_title'>
                            <h2>{window[ currentLang ].customerDetails}</h2>
                            { isManager ? (
                                <div className = 'checkout-field agreement m-checkbox m-checkbox--switch'>
                                    <input
                                        checked = { isEntity }
                                        className = { `m-checkbox__input m-checkbox--switch__input ${
                                            isEntity ? 'checked' : ''
                                        }` }
                                        id = 'isEntity'
                                        type = 'checkbox'
                                        value = { isEntity }
                                        onClick = { () => setIsEntity(!isEntity) }
                                    />
                                    <label
                                        className = 'label'
                                        htmlFor = 'isEntity'>
                                        { isEntity ? 'Юр. лицо' : 'Физ. лицо'}
                                    </label>
                                </div>
                            ) : null }
                        </div>
                        { isEntity ? (
                            <>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'usreou'
                                    label = { window[ currentLang ].usreou }
                                    name = 'usreou'
                                    user_data = { userData }
                                />
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'counterpartyName'
                                    label = { window[ currentLang ].counterparty_name }
                                    name = 'counterpartyName'
                                    user_data = { userData }
                                />
                            </>
                        ) : null}
                        <Field
                            className = 'checkout-field'
                            component = { InputField }
                            id = 'firstName'
                            label = { window[ currentLang ].first_name }
                            name = 'firstName'
                            user_data = { userData }
                        />
                        <Field
                            className = 'checkout-field'
                            component = { InputField }
                            id = 'lastName'
                            label = { window[ currentLang ].last_name }
                            name = 'lastName'
                            user_data = { userData }
                        />
                        <Field
                            className = 'checkout-field'
                            component = { InputField }
                            id = 'middleName'
                            label = { window[ currentLang ].middle_name }
                            name = 'middleName'
                            user_data = { userData }
                        />
                        <Field
                            className = 'checkout-field'
                            component = { InputField }
                            id = 'email'
                            label = { window[ currentLang ].email }
                            name = 'email'
                            user_data = { userData }
                        />
                        <Field
                            className = 'checkout-field'
                            component = { InputField }
                            id = 'mobile'
                            label = { window[ currentLang ].mobile }
                            mask = '+38(999)999-9999'
                            name = 'mobile'
                            user_data = { userData }
                        />
                        <CheckoutDelivery
                            { ...props }
                            config = { config }
                            currentLang = { currentLang }
                            hidden = { hidden }
                            isCargo = { isCargo }
                            userData = { userData }
                            onClick = { onClick }
                        />
                        <h2>{window[ currentLang ].paymentMethods}</h2>
                        <Field
                            className = 'checkout-field payment-method'
                            component = { RadioButton }
                            id = 'cod'
                            label = { window[ currentLang ].fullPaymentMethod_cod }
                            name = 'paymentMethod'
                            value = 'cod'
                        />
                        <Field
                            className = 'checkout-field payment-method'
                            component = { RadioButton }
                            id = 'cod_card'
                            label = { window[ currentLang ].fullPaymentMethod_cod_card }
                            name = 'paymentMethod'
                            value = 'cod_card'
                        />
                        <Field
                            className = 'checkout-field payment-method'
                            component = { RadioButton }
                            id = 'cheque'
                            label = { window[ currentLang ].fullPaymentMethod_cheque }
                            name = 'paymentMethod'
                            value = 'cheque'
                        />
                        <Field
                            agreement = { config.user_agreement }
                            className = 'checkout-field agreement m-checkbox m-checkbox--switch'
                            component = { Agreement }
                            currentLang = { currentLang }
                            id = 'user_agreement_order'
                            label = 'user_agreement_order'
                            name = 'user_agreement'
                            value = 'true'
                        />

                        <div className = 'checkout-button-wrap'>
                            { !mustDeleteItem ? (
                                <button
                                    className = { `checkout-button button is-primary ${isSend ? 'sended' : ''}` }
                                    disabled = { isSend }
                                    type = 'submit'>
                                    { isSend ? window[ currentLang ].sended : window[ currentLang ].next }
                                </button>
                            ) : null}
                        </div>
                    </form>
                ) }
//                validationSchema = { isManager ? ManagerSignupSchema : SignupSchema }
                validationSchema = { validationSchema }
                onSubmit = { (values) => {
                    setIsSend(true);
                    checkOrder(values);
                } }
            />
        </div>
    );
};
