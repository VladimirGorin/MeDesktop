// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { Agreement } from '../CheckoutForm/Agreement';
import { InputField } from '../CheckoutForm/inputField';
import Modal from 'react-modal';
import { api } from '../../Api';
import { book } from '../../lib';

Modal.setAppElement('#modal');

export const RegisterForm = (props) => {
    const { closeModal, setAuthorized, setUser, setIsManager, changeForm, config, currentLang } = props;
    const [ validation, setValidation ] = useState('');
    const setRegister = async (data) => {
        setValidation('');
        const result = await api.setRegister(data);
        if (result) {
            if (result.user) {
                closeModal();
                setUser(result.user);
                setAuthorized(true);
                if (result.user.group && result.user.group === 2) {
                    setIsManager(true);
                }
                props.history.push(book.account.home.path);
            } else if (result.error) {
                setValidation(window[ currentLang ][ result.error ]);
            }
        }
    };


    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        lastName: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        email: Yup.string()
            .email(window[ currentLang ].errors_email)
            .required(window[ currentLang ].errors_required),
        mobile: Yup.string()
            .matches(/([0-9-+()]{16})/, window[ currentLang ].errors_mobile)
            .min(16, window[ currentLang ].errors_toShort)
            .max(16, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        password: Yup.string()
            .min(3, window[ currentLang ].errors_toShort)
            .max(20, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        newPasswordConfirm: Yup.string()
            .min(4, window[ currentLang ].errors_toShort)
            .max(20, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required)
            .test(
                'newPasswordConfirm_test',
                window[ currentLang ].errors_password_confirm,
                function(value) {
                    const { password } = this.parent;

                    return value === password;
                },
            ),
        user_agreement: Yup.boolean()
            .oneOf([ true ], 'Must Accept Terms and Conditions'),
    });

    return (
        <div className = 'columns register-modal'>
            <Formik
                initialValues = {{
                    firstName:          '',
                    lastName:           '',
                    email:              '',
                    mobile:             '',
                    address_1:          '',
                    city:               '',
                    password:           '',
                    newPasswordConfirm: '',
                    user_agreement:     true,
                }}
                render = { (props: FormikProps<Values>) => (
                    <form onSubmit = { props.handleSubmit }>
                        <h2 className = 'title is-4'>{window[ currentLang ].register_title}</h2>
                        <div className = 'columns'>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'firstName'
                                    name = 'firstName'
                                    placeholder = { window[ currentLang ].first_name }
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'lastName'
                                    name = 'lastName'
                                    placeholder = { window[ currentLang ].last_name }
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'email'
                                    name = 'email'
                                    placeholder = { window[ currentLang ].email }
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'mobile'
                                    mask = '+38(999)999-9999'
                                    name = 'mobile'
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'address_1'
                                    name = 'address_1'
                                    placeholder = { window[ currentLang ].address1 }
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'city'
                                    name = 'city'
                                    placeholder = { window[ currentLang ].city }
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'password'
                                    name = 'password'
                                    placeholder = { window[ currentLang ].password }
                                    type = 'password'
                                />
                            </div>
                            <div className = 'column is-6'>
                                <Field
                                    className = 'checkout-field'
                                    component = { InputField }
                                    id = 'newPasswordConfirm'
                                    name = 'newPasswordConfirm'
                                    placeholder = { window[ currentLang ].newPasswordConfirm }
                                    type = 'password'
                                />
                            </div>
                            <div className = 'column is-12'>
                                <Field
                                    agreement = { config.user_agreement }
                                    className = 'checkout-field agreement'
                                    component = { Agreement }
                                    currentLang = { currentLang }
                                    id = 'user_agreement_register'
                                    label = 'user_agreement_register'
                                    name = 'user_agreement'
                                    value = 'true'
                                />
                            </div>
                        </div>
                        {
                            validation ? (
                                <p className = 'error'>{ validation }</p>
                            ) : null
                        }
                        <div className = 'checkout-button-wrap'>
                            <button
                                className = 'checkout-button button is-primary'
                                type = 'submit'>
                                {window[ currentLang ].register}
                            </button>
                        </div>
                    </form>
                ) }
                validationSchema = { RegisterSchema }
                onSubmit = { (values) => {
                    setRegister(values);
                } }
            />
            <div
                className = 'login_link'
                onClick = { ()=> changeForm(false, false) }>
                { window[ currentLang ].login_title }
            </div>
        </div>
    );
};
