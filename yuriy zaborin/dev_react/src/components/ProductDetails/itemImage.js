// eslint-disable-line
import React from 'react';
import LazyLoad from 'react-lazyload';
import { themeSettings } from '../../lib/settings';
import * as helper from '../../lib/helper';

const ItemBigImage = ({ image, productName }) => {
    if (image) {
        const imageUrl = helper.getImageUrl(
            image,
            themeSettings.bigThumbnailWidth,
        );
        const alt = productName;

        return (
            <LazyLoad>
                <img
                    alt = { alt }
                    className = 'big_image'
                    src = { imageUrl }
                    title = { alt }
                />
            </LazyLoad>
        );
    }

    return (
        <div
            className = 'large-image-placeholder'
        />
    );
};

export { ItemBigImage };
