// eslint-disable-line
import React from 'react';
import { themeSettings } from '../../lib/settings';

const LoadMore = ({
    loadMoreProducts,
    hasMore,
    loading,
    textBtn,
    className = 'button is-fullwidth is-dark',
    currentLang,
}) => {
    if (hasMore) {
        const buttonStyle = {};
        if (
            themeSettings.button_loadmore_bg && themeSettings.button_loadmore_bg.length > 0
        ) {
            buttonStyle.backgroundColor = themeSettings.button_loadmore_bg;
        }
        if (
            themeSettings.button_loadmore_color && themeSettings.button_loadmore_color.length > 0
        ) {
            buttonStyle.color = themeSettings.button_loadmore_color;
        }

        const loadMoreText = textBtn && textBtn.length > 0 ? textBtn : window[ currentLang ].loadMore;

        return (
            <button
                className = { className + (loading ? ' is-loading' : '') }
                style = { buttonStyle }
                onClick = { loadMoreProducts }>
                {loadMoreText}
            </button>
        );
    }

    return null;
};

export { LoadMore };
