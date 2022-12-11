// eslint-disable-line
import React, { useState } from 'react';

export const Quantity = (props) => {
    const { maxQuantity, currentLang } = props;
    const [ quantity, setQuantityValue ] = useState(props.quantity);

    const setQuantity = (quantity) => {
        const intQuantity = Number(quantity);
        if (intQuantity > 0 && intQuantity <= maxQuantity) {
            setQuantityValue(intQuantity);
            props.onChange(intQuantity);
        }
    };

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    const increment = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    };

    const decrement = () => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
    };

    const disabled = maxQuantity === 0;
    const value = disabled ? 0 : quantity;

    return (
        <>
            <div>{window[ currentLang ].qty}</div>
            <div className = 'product-quantity'>
                <span
                    className = 'decrement'
                    onClick = { decrement }
                />
                <input
                    disabled = { disabled }
                    maxLength = '3'
                    pattern = '\d*'
                    type = 'number'
                    value = { value }
                    onChange = { handleChange }
                />
                <span
                    className = 'increment'
                    onClick = { increment }
                />
            </div>
        </>
    );
};
