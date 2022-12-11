// eslint-disable-line
import React, {useState}  from 'react';
import { api } from '../../Api';

const AddToWishListButton = (props) => {
    const {addToWishList, removeFromWishList, authorized, setModalLoginIsOpen, product, wishList, currentLang, user} = props;
    const active = wishList.indexOf(product.id) !== -1;
    const [ disabled, setDisabledButton ] =  useState(false);
    const smsStock = async (product_id) => {
        if (!disabled) {
            const data = {
                user, product_id,
            };
            const result = await api.smsStock(data);
            if (result && result.status === 'ok') {
                setDisabledButton(true);
            }
        }
    };
    let text = disabled ? window[ currentLang ].sended : window[ currentLang ].stockBtn;

    return (
        <>
            { product.stock_status_id === 5 ? (
                <div
                    className = { `message_product ${disabled ? 'disabled' : ''}` }
                    onClick = { () => {
                        if (authorized) {
                            disabled  ?  smsStock(product.id) : smsStock(product.id);
                        } else {
                            setModalLoginIsOpen(true);
                        }
                    } }>  {text}
                </div>
            ) : null }
            <div
                className = { `addWishList-button ${ active ? 'active' : '' }` }
                title = { window[ currentLang ].wishList }
                onClick = { () => {
                    if (authorized) {
                        active ? removeFromWishList(product) : addToWishList(product);
                    } else {
                        setModalLoginIsOpen(true);
                    }
                } }
            />
        </>

    );
};


export { AddToWishListButton };
