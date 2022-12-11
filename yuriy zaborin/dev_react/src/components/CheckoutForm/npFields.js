// eslint-disable-line
import React, { useState } from 'react';
import { Field } from 'formik';
import { NpInputField } from './NpInputField';
import { NpSearchField } from './NpSearchField';

export const NpFields = (props) => {
    const { courier, currentLang } = props;
    const [ cityStatus, setCityStatus ] = useState(true);
    const [ warehouseStatus, setWarehouseStatus ] = useState(true);
    const [ NPArea, setNPArea ] = useState(null);
    const [ NPCity, setNPCity ] = useState(null);

    const checkData = (field, data) => {
        if (field && data && data.id) {
            if (field === 'NPArea') {
                setNPArea(data.id);
                setCityStatus(false);
            }
            if (field === 'NPCity') {
                setNPCity(data.id);
                setWarehouseStatus(false);
            }
        }
    };

    return (
        <>
            <Field
                checkData = { checkData }
                className = 'checkout-field'
                component = { NpSearchField }
                disable = { false }
                id = 'NPArea'
                label = { window[ currentLang ].state }
                name = 'NPArea'
                parent = { null }
                { ...props }
            />
            <Field
                checkData = { checkData }
                className = 'checkout-field'
                component = { NpSearchField }
                disable = { cityStatus }
                id = 'NPCity'
                label = { window[ currentLang ].city }
                name = 'NPCity'
                parent = { NPArea }
                { ...props }
            />
            { courier ? (
                <>
                    <div className = 'np_address'>
                        <Field
                            className = 'checkout-field'
                            component = { NpInputField }
                            disable = { warehouseStatus }
                            id = 'NPStreet'
                            label = { window[ currentLang ].street }
                            name = 'NPStreet'
                        />
                        <Field
                            className = 'checkout-field'
                            component = { NpInputField }
                            disable = { warehouseStatus }
                            id = 'NPHouse'
                            label = { window[ currentLang ].house }
                            name = 'NPHouse'
                        />
                        <Field
                            className = 'checkout-field'
                            component = { NpInputField }
                            disable = { warehouseStatus }
                            id = 'NPRoom'
                            label = { window[ currentLang ].room }
                            name = 'NPRoom'
                        />
                    </div>
                </>
            ) : (
                <Field
                    checkData = { checkData }
                    className = 'checkout-field'
                    component = { NpSearchField }
                    disable = { warehouseStatus }
                    id = 'NPWarehouse'
                    label = { window[ currentLang ].shippingNpOffice }
                    name = 'NPWarehouse'
                    parent = { NPCity }
                    { ...props }
                />
            ) }

        </>
    );
};
