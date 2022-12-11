// eslint-disable-line
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faPlusCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { SuppliersItem } from './suppliers_item';

export const Suppliers = (props) => {
    const { product } = props;
    const [ showAll, setShowAll ] = useState(false);

    const suppliers_top = product && product.suppliers ? product.suppliers.filter((item)=> item.supl_stok !== 'Нет') : null;
    const suppliers_bottom = product && product.suppliers ? product.suppliers.filter((item)=> item.supl_stok === 'Нет') : null;

    return (
        <table className = 'suppliers'>
            <tbody>
                <tr
                    className = 'supplier'>
                    <td className = 'left name '>Имя</td>
                    <td className = 'middle'>Цена</td>
                    <td className = 'middle'>РРЦ</td>
                    <td className = 'middle'>Фикс</td>
                    <td
                        className = 'middle'
                        title = 'РРЦ монитор'><FontAwesomeIcon icon = { faDesktop } />
                    </td>
                    <td
                        className = 'middle'
                        title = 'Наличие'><FontAwesomeIcon icon = { faPlusCircle } />
                    </td>
                    <td
                        className = 'small'
                        title = 'Гарантия'><FontAwesomeIcon icon = { faCog } />
                    </td>
                    <td className = 'cod'>Код</td>
                    <td className = 'left delivery'></td>
                    <td className = 'updated'>Обновлено</td>
                </tr>
                { suppliers_top && suppliers_top.length > 0 ? suppliers_top.map((supplier, index)=>(
                    <SuppliersItem
                        { ...props }
                        key = { index }
                        supplier = { supplier }
                    />
                )) : null }
                { suppliers_bottom && suppliers_bottom.length > 0 && !showAll ? (
                    <tr>
                        <td colSpan = { 10 }>
                            <span
                                className = 'all_suppliers'
                                onClick = { ()=>setShowAll(true) }>
                                {'Все поставщики'}
                            </span>
                        </td>
                    </tr>
                ) : null }
                { suppliers_bottom && suppliers_bottom.length > 0 && showAll ? suppliers_bottom.map((supplier, index)=> (
                    <SuppliersItem
                        { ...props }
                        key = { index }
                        supplier = { supplier }
                    />
                )) : null }
            </tbody>
        </table>
    );
};
