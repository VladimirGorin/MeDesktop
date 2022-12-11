// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../CheckoutForm/inputField';
import { Agreement } from '../CheckoutForm/Agreement';
import { CheckoutDelivery } from '../CheckoutForm/delivery';


export const OrderContacts = (props) => {
    //const shippingMethod = 'pickup.pickup';
    const { createOneClickOrder, user, authorized, config, shippingMethod, setShippingMethod, currentLang, isCargo, settings, setNewShippingPrice } = props;
    const [ isSend, setIsSend ] = useState(false);
    const [ hidden, setHidden ] = useState(shippingMethod);

    const onClick = (event) => {
        const target = event.currentTarget;
        setHidden(target.id);
        setShippingMethod(target.id);
        const price = settings.shippingMethodPrice[ target.id ];
        if (typeof price !== 'undefined') {
            setNewShippingPrice(price);
        }
    };

    const nameYupReq = Yup.string()
            .trim()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required)
    const SignupSchema = Yup.object().shape({
        firstName: nameYupReq,
        mobile: Yup.string()
            .matches(/([0-9-+()]{16})/, window[ currentLang ].errors_mobile)
            .min(16, window[ currentLang ].errors_toShort)
            .max(16, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        user_agreement: Yup.boolean()
            .oneOf([ true ], 'Must Accept Terms and Conditions'),
    });
    const selectedYup = Yup.string()
            .required(window[ currentLang ].errors_required)
    const addressYup = Yup.string()
            .trim()
            .min(10, window[ currentLang ].errors_toShort)
            .required(window[ currentLang ].errors_required)
    const SignupSchemaFree = SignupSchema.shape({ lastName: nameYupReq, middleName: nameYupReq, NPArea: selectedYup, NPCity: selectedYup, })
    const style = ".checkout-field span.error { pointer-events:none; position: absolute; height: 50px; display: flex; align-items: center; } .checkout-field:focus-within label span {display: none;}"

    return (

        <Formik
            initialValues = {{
                firstName:      authorized ? user.firstname : '',
                lastName:       authorized ? user.lastname : '',
                middleName:     authorized ? user.middlename : '',
                email:          authorized ? user.email : '',
                mobile:         authorized ? user.phone : '',
                shippingMethod: shippingMethod,
                paymentMethod:  'cod',
                address_1:      '',
                city:           '',
                npOffice:       '',
                comment:        '',
                user_agreement: true,
                NPArea:         '',
                NPCity:         '',
                NPWarehouse:    '',
                NPStreet:       '',
                NPHouse:        '',
            }}
            render = { (props) => (
                <form
                    className = 'fullHight'
                    onSubmit = { props.handleSubmit }>
                    <style>{style}</style>
                    <div className = 'checkout-step fullHight'>
                        <div className = 'checkout-info'>
                            <h2>{window[ currentLang ].customerDetails}</h2>
                            <div className = 'columns'>
                                <div className = 'column is-6-widescreen is-6-desktop'>
                                    <Field
                                        className = 'checkout-field'
                                        component = { InputField }
                                        id = 'firstName'
                                        label = { window[ currentLang ].first_name }
                                        name = 'firstName'
                                    />
                                </div>
                                <div className = 'column is-6-widescreen is-6-desktop'>
                                    <Field
                                        className = 'checkout-field'
                                        component = { InputField }
                                        id = 'mobile'
                                        label = { window[ currentLang ].mobile }
                                        mask = '+38(999)999-9999'
                                        name = 'mobile'
                                    />
                                </div>
                                { ['free.free', 'free.courier'].indexOf(shippingMethod) < 0 ? null : (
                                <>
                                <div className = 'column is-6-widescreen is-6-desktop'>
                                    <Field
                                        className = 'checkout-field'
                                        component = { InputField }
                                        id = 'lastName'
                                        label = { window[ currentLang ].last_name }
                                        name = 'lastName'
                                    />
                                </div>
                                <div className = 'column is-6-widescreen is-6-desktop'>
                                    <Field
                                        className = 'checkout-field'
                                        component = { InputField }
                                        id = 'middleName'
                                        label = { window[ currentLang ].middle_name }
                                        name = 'middleName'
                                    />
                                </div>
                                </>
                                )}
                            </div>
                            <div className = 'columns'>
                                <div className = 'column is-12-widescreen is-12-desktop'>
                                    <CheckoutDelivery
                                        { ...props }
                                        config = { config }
                                        currentLang = { currentLang }
                                        hidden = { hidden }
                                        isCargo = { isCargo }
                                        userData = { user }
                                        onClick = { onClick }
                                    />
                                </div>
                            </div>
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'comment'
                                label = { window[ currentLang ].comments }
                                name = 'comment'
                            />
                            <Field
                                agreement = { config.user_agreement }
                                className = 'checkout-field agreement'
                                component = { Agreement }
                                currentLang = { currentLang }
                                id = 'user_agreement_modal_order'
                                label = 'user_agreement_modal_order'
                                name = 'user_agreement'
                                value = 'true'
                            />
                        </div>
                        <div className = 'checkout-button-wrap'>
                            <button
                                className = { `checkout-button button is-primary ${isSend ? 'sended' : ''}` }
                                disabled = { isSend }
                                type = 'submit'>
                                { isSend
                                    ? window[ currentLang ].sended
                                    : window[ currentLang ].next }
                            </button>
                        </div>
                    </div>
                </form>
            ) }
            validationSchema = {
                shippingMethod == 'citylink.citylink' ? SignupSchema.shape({ address_1: addressYup }) :
                shippingMethod == 'free.free' ? SignupSchemaFree.shape({ NPWarehouse: selectedYup, }) :
                shippingMethod == 'free.courier' ? SignupSchemaFree.shape({ NPStreet: selectedYup, NPHouse: selectedYup, }) :
                SignupSchema }
            onSubmit = { (values) => {
                setIsSend(true);
                createOneClickOrder(values);
            } }
        />

    );
};
