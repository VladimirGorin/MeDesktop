// eslint-disable-line
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../Api';

export const SuppliersItem = (props) => {
    const { supplier, product, currentLang, user } = props;
    const [ editedRow, setEditedRow ] = useState(false);
    const [ brainDelivery, setBrainDelivery ] = useState('');
    const [ price, setPrice ] = useState(null);
    const [ supplPrice, setSupplPrice ] = useState(null);
    const [ stok, setStock ] = useState('');
    const [ status, setStatus ] = useState(false);
    const ref = useRef(null);
    const refSelect = useRef(null);

    useEffect(() => {
        setPrice(supplier.supl_price);
        setStock(supplier.supl_stok);
        if (supplier.supl_price_origin_usd && supplier.supl_price_origin_usd !== supplier.supl_price) {
            setSupplPrice(supplier.supl_price_origin_usd);
        } else {
            setSupplPrice(null);
        }
    }, [ supplier ]);

    const getDelivery = async (product_code) => {
        if (product_code) {
            setBrainDelivery('');
            const data = await api.getDelivery(product_code);
            if (data && data.time) {
                const time = moment(new Date(data.time * 1000)).format('DD.MM.YYYY');
                setBrainDelivery(time);
            } else if (data && data.error) {
                setBrainDelivery(window[ currentLang ][ data.error ]);
            }
        }
    };

    const setData = async () => {
        const supl_price = ref.current.value;
        const supl_stok = refSelect.current.value;
        const data = {
            id:          product.id,
            supl_obj_id: supplier._id,
            supl_stok:   supl_stok,
            supl_price:  supl_price,
            linked:      typeof supplier.linked !== 'undefined' ? supplier.linked : true,
            manager:     user,
        };
        setPrice(supl_price);
        setStock(supl_stok);
        const result = await api.setSupplierData(data);
        if (result) {
            setStatus(true);
            setTimeout(function() {
                setStatus(false);
            }, 3000);
        }
    };

    const suplStatus = [
        {id: '', name: ''},
        {id: 'Есть', name: 'Есть'},
        {id: 'Под заказ', name: 'Под заказ'},
        {id: 'Нет', name: 'Нет'},
    ];

    return (
        <tr
            className = { `supplier ${
                supplier.selected_supl_id === supplier.supl_id && supplier.supl_stok === 'Есть' ? 'active' : ''
            } ${
                product.cashless_supl && product.cashless_supl === supplier.supl_id ? 'cashless_supl' : ''
            }` }
            title = { `${
                supplier.selected_supl_id === supplier.supl_id && supplier.supl_stok === 'Есть' ? 'Выбранный поставщик' : ''
            } ${
                product.cashless_supl && product.cashless_supl === supplier.supl_id ? 'Безнал поставщик' : ''
            }` }
            onDoubleClick = { () => { setEditedRow(!editedRow); } }>
            <td className = 'left name'>{ supplier.supl_name }</td>
            <td className = 'middle'>
                { editedRow ? (
                    <input
                        name = 'supl_price'
                        ref = { ref }
                        type = 'text'
                        value = { price }
                        onChange = { () => { setData(); } }
                    />
                ) : (
                    <>
                        <div>
                            ${ price }
                        </div>
                        { supplPrice ? (
                            <div>
                                (${supplPrice})
                            </div>
                        ) : null }
                    </>
                ) }
            </td>
            <td className = 'middle'>
                <div className = { product.price_rrc_supl === supplier.supl_id ? 'rrc active' : 'rrc' }>
                    { supplier.rrc && supplier.rrc > 0 ? supplier.rrc + '₴' : '' }
                </div>
            </td>
            <td className = 'middle'>
                <div className = { product.upc && product.price === supplier.fixed_price ? 'rrc active' : 'rrc' }>
                    { supplier.fixed_price && supplier.fixed_price > 0 ? supplier.fixed_price + '₴' : '' }
                </div>
            </td>
            <td className = 'middle'>
                { supplier.rrc_monitor ? (
                    <FontAwesomeIcon icon = { faCheck } />
                ) : (
                    <FontAwesomeIcon icon = { faBan } />
                ) }
            </td>
            <td className = 'middle'>
                { editedRow ? (
                    <select
                        name = 'supl_stok'
                        ref = { refSelect }
                        value = { stok }
                        onChange = { () => { setData(); } }>
                        { suplStatus.map((item)=>{
                            return (
                                <option
                                    key = { item.id }
                                    value = { item.id }>
                                    { item.name }
                                </option>
                            );
                        }) }
                    </select>
                ) : (
                    <span>
                        { stok }
                    </span>
                ) }
            </td>
            <td className = 'small'>{ supplier.supl_warranty ? supplier.supl_warranty : ''}</td>
            <td className = 'cod'>{ supplier.product_code }</td>
            <td className = 'left delivery'>
                { status ? (
                    <span className = 'success'>
                        <FontAwesomeIcon icon = { faCheck } />
                    </span>
                ) : (
                    <>
                        { supplier.supl_id === 1 ? (
                            <div
                                className = 'delivery_btn'
                                title = { window[ currentLang ].check_delivery }
                                onClick = { ()=>getDelivery(supplier.product_code) }>
                                <FontAwesomeIcon icon = { faCalendarCheck } />
                                <span>
                                    { brainDelivery }
                                </span>
                            </div>
                        ) : null }
                    </>
                ) }
            </td>
            <td className = 'updated'>
                { [ 1, 2, 5, 73, 78, 79, 88 ].indexOf(supplier.supl_id) !== -1 && supplier.updatedAt ? (
                    <div>
                        { moment(supplier.updatedAt).format('DD.MM.YYYY HH:mm') }
                    </div>
                ) : null }
            </td>
        </tr>
    );
};
