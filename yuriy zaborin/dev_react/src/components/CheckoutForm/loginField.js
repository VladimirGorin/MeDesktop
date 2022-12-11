// eslint-disable-line
import React, { useEffect, useState, useRef } from 'react';
import InputMask from 'react-input-mask';

export const LoginField = ({
    hideError,
    id,
    className,
    label,
    mask,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const { isEmail, placeholder } = props;
    const [ value, setValue ] = useState('');
    const ref = useRef();

    useEffect(() => {
        setValue('');
        setFieldValue(field.name, '');
        ref.current.value = '';
    }, [ isEmail ]);

    const handleChange = (event)=>{
        setValue(event.target.value);
        setFieldValue(field.name, event.target.value);
    };

    return (
        <div className = { className }>
            <label htmlFor = { id }>
                {label}
                {!hideError && touched[ field.name ] && errors[ field.name ] && <span className = 'error'>{errors[ field.name ]}</span>}
            </label>
            { mask ? (
                <InputMask
                    className = { touched[ field.name ] && errors[ field.name ] ? 'invalid' : '' }
                    id = { field.name }
                    mask = { mask }
                    maskChar = { '_' }
                    name = { field.name }
                    placeholder = { '+38(___)___-____' }
                    ref = { ref }
                    type = 'text'
                    value = { value }
                    onChange = { (event)=>handleChange(event) }
                />
            ) : (
                <input
                    className = { touched[ field.name ] && errors[ field.name ] ? 'invalid' : '' }
                    id = { field.name }
                    name = { field.name }
                    placeholder = { placeholder }
                    ref = { ref }
                    type = 'text'
                    value = { value }
                    onChange = { (event)=>handleChange(event) }
                />
            ) }
        </div>
    );
};
