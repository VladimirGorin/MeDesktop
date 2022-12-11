// eslint-disable-line
import React, { useState, useRef } from 'react';
import { api } from '../../Api';

export const NpSearchField = ({
    className,
    label,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const { checkData, disable, parent, isCargo } = props;
    const [ value, setValue ] = useState('');
    const [ showList, setShowList ] = useState(false);
    const [ list, setList ] = useState(null);
    const ref = useRef(null);

    const fetchData = async () => {
        const item = {
            name:    field.name,
            search:  ref.current.value,
            parent:  parent,
            isCargo: isCargo,
        };
        const data = await api.NpApi(item);
        if (data && data.length > 0) {
            setList(data);
        } else {
            setList(null);
        }
    };

    const onFocus = () => {
        fetchData();
        setShowList(true);
    };

    const onChange = (event) => {
        setValue(event.target.value);
        fetchData();
        setShowList(true);
    };

    const setData = (item) => {
        setValue(item.name);
        setFieldValue(field.name, item.id);
        if (field.name === 'NPCity') {
            setFieldValue('city', item.name);
        }
        if (field.name === 'NPWarehouse') {
            setFieldValue('npOffice', item.name);
        }
        setShowList(false);
        checkData(field.name, item);
    };

    const listJSX = list && list.length > 0 ? list.map((item)=>{
        return (
            <div
                className = 'searchItem'
                key = { item.id }
                onClick = { () => setData(item) }>
                { item.name }
            </div>
        );
    }) : null;

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
                onFocus = { onFocus }
            />
            { listJSX && showList ? (
                <div className = 'searchResult'>
                    { listJSX }
                </div>
            ) : null}
        </div>
    );
};
