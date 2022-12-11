// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../CheckoutForm/inputField';
import { TextareaField } from '../CheckoutForm/textareaField';

export const ServiceForm = (props) => {
    const { createServiceRequest, user, authorized, orderInfo, currentLang } = props;
    const [ isSend, setIsSend ] = useState(false);

    let firstname = authorized ? user.firstname : '';
    firstname = orderInfo && orderInfo.firstName ? orderInfo.firstName : firstname;

    let lastname = authorized ? user.lastname : '';
    lastname = orderInfo && orderInfo.lastName ? orderInfo.lastName : lastname;

    let email = authorized ? user.email : '';
    email = orderInfo && orderInfo.email ? orderInfo.email : email;

    let phone = authorized ? user.phone : '';
    phone = orderInfo && orderInfo.phone ? orderInfo.phone : phone;

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        mobile: Yup.string()
            .matches(/([0-9-+()]{16})/, window[ currentLang ].errors_mobile)
            .min(16, window[ currentLang ].errors_toShort)
            .max(16, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        comment: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .required(window[ currentLang ].errors_required),
    });

    return (
        <div className = 'checkout-step'>
            <Formik
                initialValues = {{
                    firstName: firstname,
                    lastName:  lastname,
                    email:     email,
                    mobile:    phone,
                    orderId:   orderInfo && orderInfo.orderId ? orderInfo.orderId : '',
                    comment:   '',
                }}
                render = { (props: FormikProps<Values>) => (
                    <form onSubmit = { props.handleSubmit }>
                        <h2>{window[ currentLang ].serviceFormTitle}</h2>
                        <div className = 'columns'>
                            <div className = 'column is-6'>
                                <Field
                                    hideError
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'firstName'
                                    label = { window[ currentLang ].first_name }
                                    name = 'firstName'
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    hideError
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'lastName'
                                    label = { window[ currentLang ].last_name }
                                    name = 'lastName'
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    hideError
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'email'
                                    label = { window[ currentLang ].email }
                                    name = 'email'
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    hideError
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'mobile'
                                    label = { window[ currentLang ].mobile }
                                    mask = '+38(999)999-9999'
                                    name = 'mobile'
                                />
                            </div>
                            <div className = 'column is-12'>
                                <Field
                                    hideError
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'orderId'
                                    label = { window[ currentLang ].orderId }
                                    name = 'orderId'
                                />
                            </div>
                            <div className = 'column is-12'>
                                <Field
                                    hideError
                                    className = 'checkout-field'
                                    component = { TextareaField }
                                    id = 'comment'
                                    label = { window[ currentLang ].request }
                                    name = 'comment'
                                />
                            </div>
                        </div>
                        <div className = 'checkout-button-wrap'>
                            <button
                                className = { `checkout-button button is-primary ${isSend ? 'sended' : ''}` }
                                disabled = { isSend }
                                type = 'submit'>
                                { isSend ? window[ currentLang ].sended : window[ currentLang ].send }
                            </button>
                        </div>
                    </form>
                ) }
                validationSchema = { SignupSchema }
                onSubmit = { (values) => {
                    setIsSend(true);
                    createServiceRequest(values);
                } }
            />
        </div>
    );
};
