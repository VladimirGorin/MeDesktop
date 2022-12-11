// eslint-disable-line
import React, { useState, useRef } from 'react';

export const NpInputField = ({
    className,
    label,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const { disable } = props;
    const [ value, setValue ] = useState('');
    const ref = useRef(null);

    const onChange = () => {
        setValue(ref.current.value);
        setFieldValue(field.name, ref.current.value);
    };

    return (
        <div className = { className }>
            <input
                className = { touched[ field.name ] && errors[ field.name ] ? 'invalid' : '' }
                disabled = { disable }
                id = { field.name }
                name = { field.name }
                placeholder = { label }
                ref = { ref }
                type = 'text'
                value = { value }
                onChange = { onChange }
            />
        </div>
    );
};
