// eslint-disable-line
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { themeSettings } from '../../lib/settings';
import * as helper from '../../lib/helper';

const renderItem = (item) => {
    const imageUrl = helper.getSlideUrl(
        item.image,
        themeSettings.bigThumbnailWidth,
    );

    return item.link.indexOf('https://') !== -1 ? (
        <div className = 'image-gallery-image'>
            <a
                href = { item.link }
                rel = 'noopener noreferrer'
                target = '_blank'>
                <img
                    alt = ''
                    src = { imageUrl }
                />
            </a>
        </div>
    ) : (
        <div className = 'image-gallery-image'>
            <NavLink to = { item.link || '' }>
                <img
                    alt = ''
                    src = { imageUrl }
                />
            </NavLink>
        </div>
    );
};

const HomeSlider = ({ images }) => {
    if (images && images.length > 0) {
        const items = images.map((item) => ({
            image:       item.image,
            title:       item.title || '',
            description: item.description || '',
            link:        item.link || '',
            button:      item.button,
        }));

        return (
            <div className = 'home-slider'>
                <ImageGallery
                    autoPlay
                    lazyLoad
                    items = { items }
                    renderItem = { renderItem }
                    showBullets = { images.length > 1 }
                    showFullscreenButton = { false }
                    showNav = { themeSettings.home_gallery_shownav === true }
                    showPlayButton = { false }
                    showThumbnails = { false }
                    slideInterval = { 7000 }
                    slideOnThumbnailHover = { false }
                />
            </div>
        );
    }

    return null;
};

HomeSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({})),
};

HomeSlider.defaultProps = {
    images: null,
};

export { HomeSlider };
