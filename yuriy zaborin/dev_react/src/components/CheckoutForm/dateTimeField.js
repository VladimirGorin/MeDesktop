// eslint-disable-line
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

export const DateTimeField = ({
    className,
    label,
    field, // { name, value, onChange, onBlur }
    form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const { disable } = props;
    const [ startDate, setStartDate ] = useState('');

    const  onChange = (date) => {
        setFieldValue(field.name, date);
        setStartDate(date);
    };

    return (
        <div className = { className }>
            <DatePicker
                showTimeSelect
                dateFormat = 'dd.MM.yyyy HH:mm'
                disabled = { disable }
                id = { field.name }
                locale = { 'ru' }
                name = { field.name }
                placeholderText = { label }
                selected = { startDate }
                onChange = { (date) => onChange(date) }
            />
        </div>
    );
};
