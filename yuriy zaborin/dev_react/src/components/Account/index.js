// eslint-disable-line
import React, { useEffect, useState} from 'react';
import { AccountMenu, AccountEdit, AccountPassword, AccountAddress, AccountOrders, AccountNewsletter, AccountOrderDetails, ServiceBtn } from '../../components';

export const Account = (props) => {
    const [ component, setComponent ] = useState('');
    const { authorized } = props;

    if (!authorized) {
        props.history.push('/');
    }

    useEffect(() => {
        let componentName = '';
        switch (props.match.path) {
            case '/account-edit/':
                componentName = 'AccountEdit';
                break;
            case '/account-password/':
                componentName = 'AccountPassword';
                break;
            case '/account-address/':
                componentName = 'AccountAddress';
                break;
            case '/order/':
                componentName = 'AccountOrders';
                break;
            case '/order-details/:order_id':
                componentName = 'AccountOrderDetails';
                break;
            case '/newsletter/':
                componentName = 'AccountNewsletter';
                break;
            default:
                componentName = '';
        }
        setComponent(componentName);
    }, [ props.location.pathname ]);

    return (
        <section className = 'section account'>
            <div className = 'container'>
                <div className = 'columns'>
                    <div className = 'column is-3'>
                        <AccountMenu { ...props } />
                        <ServiceBtn
                            { ...props }
                        />
                    </div>
                    <div className = 'column is-9'>
                        {
                            component === 'AccountEdit' ? (
                                <AccountEdit { ...props } />
                            ) : null
                        }
                        {
                            component === 'AccountPassword' ? (
                                <AccountPassword { ...props } />
                            ) : null
                        }
                        {
                            component === 'AccountAddress' ? (
                                <AccountAddress { ...props } />
                            ) : null
                        }
                        {
                            component === 'AccountOrders' ? (
                                <AccountOrders { ...props } />
                            ) : null
                        }
                        {
                            component === 'AccountOrderDetails' ? (
                                <AccountOrderDetails { ...props } />
                            ) : null
                        }
                        {
                            component === 'AccountNewsletter' ? (
                                <AccountNewsletter { ...props } />
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};
