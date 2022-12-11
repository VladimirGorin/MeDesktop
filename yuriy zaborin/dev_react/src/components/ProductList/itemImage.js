// eslint-disable-line
import React from 'react';
import LazyLoad from 'react-lazyload';
import * as helper from '../../lib/helper';
import { themeSettings } from '../../lib/settings';

const ItemImage = ({ image, productName, height, size }) => {
    const imageSize =  size ? size : themeSettings.listThumbnailWidth;

    if (image) {
        const imageUrl = helper.getThumbnailUrl(
            image,
            imageSize,
        );
        const alt = productName;

        return (
            <LazyLoad height = { height }>
                <img
                    alt = { alt }
                    src = { imageUrl }
                    title = { alt }
                />
            </LazyLoad>
        );
    }

    return (
        <div
            className = 'small-image-placeholder'
          
        />
    );
};

export { ItemImage };
