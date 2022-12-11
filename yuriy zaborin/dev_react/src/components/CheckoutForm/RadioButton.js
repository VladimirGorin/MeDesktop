// eslint-disable-line
import React from 'react';

export const RadioButton = ({
    id,
    className,
    label,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => (
    <label
        className = { className }
        htmlFor = { id }>
        <input
            checked = { id === field.value }
            className = { touched[ field.name ] && errors[ field.name ] ? 'invalid' : '' }
            id = { id }
            type = 'radio'
            value = { id }
            onClick = { (event) => field.onChange(event) }
            { ...field }
            { ...props }
        />
        <span
            className = 'label'
            htmlFor = { id }>
            {label}
        </span>
    </label>
);
