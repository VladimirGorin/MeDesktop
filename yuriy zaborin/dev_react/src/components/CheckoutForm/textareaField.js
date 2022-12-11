// eslint-disable-line
import React from 'react';

export const TextareaField = ({
    hideError,
    id,
    className,
    label,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => (
    <div className = { className }>
        <label htmlFor = { id }>
            {label}
            {!hideError && touched[ field.name ] && errors[ field.name ] && <span className = 'error'>{errors[ field.name ]}</span>}
        </label>
        <textarea
            className = { touched[ field.name ] && errors[ field.name ] ? 'invalid' : '' }
            { ...field }
            { ...props }
        />
    </div>
);
