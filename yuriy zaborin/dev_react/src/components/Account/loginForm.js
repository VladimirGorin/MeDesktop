// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { InputField, LoginField } from '../../components';
import Modal from 'react-modal';
import { api } from '../../Api';

Modal.setAppElement('#modal');

export const LoginForm = (props) => {
    const { closeModal, setAuthorized, setUser, setIsManager, changeForm, currentLang } = props;
    const [ validation, setValidation ] = useState('');
    const [ isEmail, setIsEmail ] = useState(true);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required(function() {
                return isEmail ? window[ currentLang ].errors_required : null;
            })
            .email(window[ currentLang ].errors_email),
        mobile: Yup.string()
            .required(function() {
                return !isEmail ? window[ currentLang ].errors_required : null;
            })
            .matches(/([0-9-+()]{16})/, window[ currentLang ].errors_mobile)
            .min(16, window[ currentLang ].errors_toShort)
            .max(16, window[ currentLang ].errors_toLong),
        password: Yup.string()
            .required(window[ currentLang ].errors_required),
    });
    const setLogin = async (data) => {
        setValidation('');
        const result = await api.setLogin(data);
        if (result) {
            if (result.user) {
                closeModal();
                setUser(result.user);
                setAuthorized(true);
                if (result.user.group && result.user.group === 2) {
                    setIsManager(true);
                }
             //   props.history.push(book.account.home.path);
            } else if (result.error) {
                setValidation(window[ currentLang ][ result.error ]);
            }
        }
    };

    return (
        <div className = 'columns login-modal'>
            <Formik
                initialValues = {{
                    email:    '',
                    mobile:   '',
                    password: '',
                }}
                render = { (props: FormikProps<Values>) => (
                    <form onSubmit = { props.handleSubmit }>
                        <h2 className = 'title is-4'>{window[ currentLang ].login_title}</h2>
                        <div className = 'login-fields'>
                            <Field
                                className = { `checkout-field ${ isEmail ? 'hidden' : '' }` }
                                component = { LoginField }
                                id = 'mobile'
                                isEmail = { isEmail }
                                mask = '+38(999)999-9999'
                                name = 'mobile'
                            />
                            <Field
                                className = { `checkout-field ${ isEmail ? '' : 'hidden' }` }
                                component = { LoginField }
                                id = 'email'
                                isEmail = { isEmail }
                                name = 'email'
                                placeholder = { window[ currentLang ].email }
                            />
                            <span
                                className = 'changeFields'
                                onClick = { ()=>setIsEmail(!isEmail) }>
                                <FontAwesomeIcon icon = { isEmail ? faPhone : faEnvelope } />
                                <span className = 'field-info'>
                                    { isEmail ? window[ currentLang ].login_by_phone : window[ currentLang ].login_by_email }
                                </span>
                            </span>
                        </div>
                        <Field
                            className = 'checkout-field'
                            component = { InputField }
                            id = 'password'
                            name = 'password'
                            placeholder = { window[ currentLang ].password }
                            type = 'password'
                        />
                        {
                            validation ? (
                                <p className = 'error'>{ validation }</p>
                            ) : null
                        }
                        <div className = 'checkout-button-wrap'>
                            <button
                                className = 'checkout-button button is-primary'
                                type = 'submit'>
                                {window[ currentLang ].login}
                            </button>
                        </div>
                    </form>
                ) }
                validationSchema = { LoginSchema }
                onSubmit = { (values) => {
                    setLogin(values);
                } }
            />
            <div
                className = 'column is-6 login_link'
                onClick = { ()=> changeForm(true, false) }>
                { window[ currentLang ].register_title }
            </div>
            <div
                className = 'column is-6 login_link'
                onClick = { ()=> changeForm(false, true) }>
                { window[ currentLang ].forgot_password }
            </div>
        </div>
    );
};
