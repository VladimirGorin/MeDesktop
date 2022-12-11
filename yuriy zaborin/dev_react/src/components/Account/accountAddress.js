// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components';
import { api } from '../../Api';

export const AccountAddress = (props) => {
    const { user, authorized, setUser, currentLang }  = props;
    const [ validation, setValidation ] = useState('');
    const [ success, setSuccess ] = useState(false);

    const FormSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        lastname: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        company: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong),
        address_1: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong),
        address_2: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong),
        city: Yup.string()
            .min(2, window[ currentLang ].errors_toShort)
            .max(30, window[ currentLang ].errors_toLong),
        postcode: Yup.string()
            .min(5, window[ currentLang ].errors_toShort)
            .max(8, window[ currentLang ].errors_toLong),
    });

    const editAddress = async (data) => {
        setSuccess(false);
        const result = await api.editAddress(data);
        if (result) {
            if (result.address) {
                let newUser = user;
                newUser.address = result.address;
                setUser(newUser);
                setSuccess(true);
            } else if (result.error) {
                setValidation(window[ currentLang ][ result.error ]);
            }
        }
    };

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
                        firstname:   authorized ? user.address.firstname : '',
                        lastname:    authorized ? user.address.lastname : '',
                        company:     authorized ? user.address.company : '',
                        address_1:   authorized ? user.address.address_1 : '',
                        address_2:   authorized ? user.address.address_2 : '',
                        city:        authorized ? user.address.city : '',
                        postcode:    authorized ? user.address.postcode : '',
                        customer_id: authorized ? user.customer_id : '',
                    }}
                    render = { (props: FormikProps<Values>) => (
                        <form onSubmit = { props.handleSubmit }>
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'firstname'
                                label = { window[ currentLang ].first_name }
                                name = 'firstname'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'lastname'
                                label = { window[ currentLang ].last_name }
                                name = 'lastname'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'company'
                                label = { window[ currentLang ].company }
                                name = 'company'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'address_1'
                                label = { window[ currentLang ].address1 }
                                name = 'address_1'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'address_2'
                                label = { window[ currentLang ].address2 }
                                name = 'address_2'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'city'
                                label = { window[ currentLang ].city }
                                name = 'city'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'postcode'
                                label = { window[ currentLang ].postal_code }
                                name = 'postcode'
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
                        editAddress(values);
                    } }
                />
            </div>
        </>
    );
};
