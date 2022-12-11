// eslint-disable-line
import React, { useState } from 'react';
import { Formik, Field   } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components';
import { api } from '../../Api';


export const AccountPassword = (props) => {
    const { user, authorized, currentLang }  = props;
    const [ validation, setValidation ] = useState('');
    const [ success, setSuccess ] = useState(false);

    const FormSchema = Yup.object().shape({
        password: Yup.string()
            .min(4, window[ currentLang ].errors_toShort)
            .max(20, window[ currentLang ].errors_toLong)
            .required(window[ currentLang ].errors_required),
        newPassword: Yup.string()
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
                    const { newPassword } = this.parent;

                    return value === newPassword;
                },
            ),
    });

    const editPassword = async (data, actions) => {
        setSuccess(false);
        setValidation('');
        const result = await api.editPassword(data);
        if (result) {
            if (result.status) {
                setSuccess(true);
                actions.resetForm();
            } else if (result.error) {
                setValidation(window[ currentLang ][ result.error ]);
            }
        }
    };

    return (
        <>
            <h1>{window[ currentLang ].AccountPassword}</h1>
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
                        password:           '',
                        newPassword:        '',
                        newPasswordConfirm: '',
                        customer_id:        authorized ? user.customer_id : '',
                    }}
                    render = { (props: FormikProps<Values>) => (
                        <form onSubmit = { props.handleSubmit }>
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'password'
                                label = { window[ currentLang ].password }
                                name = 'password'
                                type = 'password'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'newPassword'
                                label = { window[ currentLang ].newPassword }
                                name = 'newPassword'
                                type = 'password'
                            />
                            <Field
                                className = 'checkout-field'
                                component = { InputField }
                                id = 'newPasswordConfirm'
                                label = { window[ currentLang ].newPasswordConfirm }
                                name = 'newPasswordConfirm'
                                type = 'password'
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
                    onSubmit = { (values, actions) => {
                        editPassword(values, actions);
                    } }
                />
            </div>
        </>
    );
};
