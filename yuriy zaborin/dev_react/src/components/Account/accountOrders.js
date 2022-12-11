// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LoadMore } from '../../components';
import { api } from '../../Api';
import moment from 'moment';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

export const AccountOrders = (props) => {
    const { currentLang, user, settings } = props;
    const [ orders, setOrders ] = useState([]);
    const [ skip, setSkip ] = useState(0);
    const [ loadingMoreOrders, setLoadingMoreOrders ] = useState(false);
    const [ ordersHasMore, setOrdersHasMore ] = useState(false);

    const limit = 10;
    const params = {
        skip:        skip,
        limit:       limit,
        customer_id: user.customer_id,
        user:        user,
    };

    const getAccountOrders = async (params, loadingMoreOrders) => {
        const data = await api.getAccountOrders(params);
        if (data && data.orders) {
            if (loadingMoreOrders) {
                setOrders(orders.concat(data.orders));
            } else {
                setOrders(data.orders);
            }
        }
        if (data && typeof data.total !== 'undefined') {
            const showMoreBtn = data.total > limit && data.orders.length === limit;
            if (ordersHasMore !== showMoreBtn) {
                setOrdersHasMore(showMoreBtn);
            }
        }
        if (loadingMoreOrders) {
            setLoadingMoreOrders(false);
        }
    };

    useEffect(() => {
        getAccountOrders(params, loadingMoreOrders);
    }, [ skip ]);

    const loadMoreOrders = () => {
        setLoadingMoreOrders(true);
        setSkip(skip + limit);
    };

    const items = orders && orders.length > 0
        ? orders.map((order) => (
            <div
                className = 'order_item'
                key = { order.order_id }>
                <div className = 'el half'>
                    <NavLink
                        activeClassName = 'is-active'
                        to = { '/order-details/' + order.order_id }>
                        {order.order_id}
                    </NavLink>
                </div>
                <div className = 'el double'>
                    {window[ currentLang ][ 'order_status_' + order.order_status_id ]}
                </div>
                <div className = 'el'>
                    { moment(order.createdAt).format('DD.MM.YYYY') }
                </div>
                <div className = 'el half'>
                    {order.products}
                </div>
                <div className = 'el double'>
                    {order.client}
                </div>
                <div className = 'el'>
                    <FormattedCurrency
                        number = { order.total }
                        settings = { settings }
                    />
                </div>
            </div>
        ))
        : (
            <div className = 'no-items'>
                { window[ currentLang ].list_empty }
            </div>
        );

    return (
        <>
            <h1>{window[ currentLang ].orders_title}</h1>
            <div className = 'orders'>
                <div className = 'order_item orders_title'>
                    <div className = 'el half'>
                        {window[ currentLang ].order}
                    </div>
                    <div className = 'el double'>
                        {window[ currentLang ].orders_status}
                    </div>
                    <div className = 'el'>
                        {window[ currentLang ].orders_date}
                    </div>
                    <div className = 'el half'>
                        {window[ currentLang ].orders_products}
                    </div>
                    <div className = 'el double'>
                        {window[ currentLang ].orders_client}
                    </div>
                    <div className = 'el'>
                        {window[ currentLang ].orders_total}
                    </div>
                </div>
                {items}
            </div>
            <div className = 'load-more'>
                <LoadMore
                    hasMore = { ordersHasMore }
                    loadMoreProducts = { loadMoreOrders }
                    loading = { loadingMoreOrders }
                    textBtn = { window[ currentLang ].loadMore }
                />
            </div>
        </>
    );
};
