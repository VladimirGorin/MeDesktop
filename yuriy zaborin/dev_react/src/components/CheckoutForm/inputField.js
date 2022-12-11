// eslint-disable-line
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

export const InputField = ({
    hideError,
    id,
    className,
    label,
    mask,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const { user_data } = props;
    const [ value, setValue ] = useState('');

    useEffect(() => {
        if (user_data && user_data[ field.name ]) {
            setValue(user_data[ field.name ]);
            setFieldValue(field.name, user_data[ field.name ]);
        }
    }, [ user_data ]);

    return (
        <div className = { className }>
            <label htmlFor = { id }>
                {label}
                {!hideError && touched[ field.name ] && errors[ field.name ] && <span className = 'error'>{errors[ field.name ]}</span>}
            </label>
            { mask ? (
                <InputMask
                    className = { touched[ field.name ] && errors[ field.name ] ? 'invalid' : '' }
                    mask = { mask }
                    maskChar = { '_' }
                    placeholder = { '+38(___)___-____' }
                    type = 'text'
                    { ...field }
                />
            ) : (
                <input
                    className = { touched[ field.name ] && errors[ field.name ] ? 'invalid' : '' }
                    type = 'text'
                    value = { value }
                    { ...field }
                    { ...props }
                />
            ) }
        </div>
    );
};
