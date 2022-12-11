// eslint-disable-line
import React from 'react';
import { Link } from 'react-router-dom';
const WishListCount = (props) => {
    const { wishListCount } = props;

    if (wishListCount && wishListCount > 0) {
        return <span className = 'compare-count'>{wishListCount}</span>;
    }

    return null;
};

const WishListIcon = ({ currentLang }) => {
    return (
        <img
            alt = { window[ currentLang ].wishList }
            className = 'icon'
            src = '/assets/images/WishList.svg'
            style = {{ minWidth: 24 }}
            title = { window[ currentLang ].wishList }
        />
    );
};

export const WishListIndicator  = (props) => {
    const { currentLang, wishListCount} = props;

    return (
        wishListCount ? (
            <Link
                className = 'wishlist_link'
                to = '/wishlist/'>
                <span
                    className = 'compare-button'>
                    <WishListIcon
                        currentLang = { currentLang }
                    />
                    <WishListCount { ...props } />
                </span>
            </Link>
        ) : null
    );
};
