// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { LoginField } from '../../components';
import Modal from 'react-modal';
import { api } from '../../Api';

Modal.setAppElement('#modal');

export const ForgotForm = (props) => {
    const { changeForm, currentLang } = props;
    const [ validation, setValidation ] = useState('');
    const [ isSend, setIsSend ] = useState(false);
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
    });

    const setForgot = async (data, actions) => {
        setValidation('');
        const result = await api.setForgot(data);
        if (result) {
            if (result.success) {
                setValidation(window[ currentLang ][ result.success ]);
                actions.resetForm();
            } else if (result.error) {
                setValidation(window[ currentLang ][ result.error ]);
                setIsSend(false);
            }
        }
    };

    return (
        <div className = 'columns login-modal'>
            <Formik
                initialValues = {{
                    email:  '',
                    mobile: '',
                }}
                render = { (props: FormikProps<Values>) => (
                    <form onSubmit = { props.handleSubmit }>
                        <h2 className = 'title is-4'>{window[ currentLang ].forgot_password}</h2>
                        <p className = 'subtitle is-6'>{ isEmail ? window[ currentLang ].forgot_password_subtitle : window[ currentLang ].forgot_password_subtitle_phone }</p>
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
                                    { isEmail ? window[ currentLang ].forgot_by_phone : window[ currentLang ].forgot_by_email }
                                </span>
                            </span>
                        </div>
                        {
                            validation ? (
                                <p className = 'error'>{ validation }</p>
                            ) : null
                        }
                        <div className = 'checkout-button-wrap'>
                            <button
                                className = { `checkout-button button is-primary ${isSend ? 'sended' : ''}` }
                                disabled = { isSend }
                                type = 'submit'>
                                { isSend ? window[ currentLang ].sended : window[ currentLang ].submit }
                            </button>
                        </div>
                    </form>
                ) }
                validationSchema = { LoginSchema }
                onSubmit = { (values, actions) => {
                    setIsSend(true);
                    setForgot(values, actions);
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
