// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components';
import { api } from '../../Api';

export const AccountEdit = (props) => {
    const { user, authorized, setUser, currentLang }  = props;
    const [ validation, setValidation ] = useState('');
    const [ success, setSuccess ] = useState(false);

    const editAccount = async (data) => {
        setSuccess(false);
        const result = await api.editAccount(data);
        if (result) {
            if (result.user) {
                setUser(result.user);
                setSuccess(true);
            } else if (result.error) {
                setValidation(window[ currentLang ][ result.error ]);
            }
        }
    };

    const FormSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        lastName: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        mobile: Yup.string()
            .matches(/([0-9-+()]{16})/, window[ currentLang ].errors_mobile)
            .min(16, window[ currentLang ].errors_toShort)
            .max(16, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        email: Yup.string()
            .email(window[ currentLang ].errors_email)
            .required(window[ currentLang ].errors_required),
    });

    return (
        <>
            <h1>{window[ currentLang ].AccountEdit}</h1>
            <div className = 'account-form'>
                {
                    validation ? (
                        <p className = 'error'>{ validation }</p>
                    ) : null
                }
                {
                    success ? (
                        <p className = 'success'>{ window[ currentLang ].edit_success }</p>
                    ) : null
                }
                <Formik
                    initialValues = {{
                        firstName:   authorized ? user.firstname : '',
                        lastName:    authorized ? user.lastname : '',
                        email:       authorized ? user.email : '',
                        mobile:      authorized ? user.phone : '',
                        customer_id: authorized ? user.customer_id : '',
                    }}
                    render = { (props: FormikProps<Values>) => (
                        <form onSubmit = { props.handleSubmit }>
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'firstName'
                                label = { window[ currentLang ].first_name }
                                name = 'firstName'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'lastName'
                                label = { window[ currentLang ].last_name }
                                name = 'lastName'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'email'
                                label = { window[ currentLang ].email }
                                name = 'email'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'mobile'
                                label = { window[ currentLang ].mobile }
                                mask = '+38(999)999-9999'
                                name = 'mobile'
                            />
                            <div className = 'checkout-button-wrap'>
                                <button
                                    className = 'checkout-button button is-primary'
                                    type = 'submit'>
                                    {window[ currentLang ].submit}
                                </button>
                            </div>
                        </form>
                    ) }
                    validationSchema = { FormSchema }
                    onSubmit = { (values) => {
                        editAccount(values);
                    } }
                />
            </div>
        </>
    );
};
