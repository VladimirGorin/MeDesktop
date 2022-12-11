import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import * as helper from '../../lib/helper';
import { themeSettings } from '../../lib/settings';

export const Gallery = (props) => {
    const { images, name } = props;
    const [ lightboxIsOpen, setLightboxIsOpen ] = useState(false);
    const [ lbPhotoIndex, setLightboxPhotoIndex ] = useState(0);

    const openLightbox = () => {
        setLightboxIsOpen(true);
    };

    const setPhotoIndex = (index) => {
        setLightboxPhotoIndex(index);
    };

    if (images && images.length > 0) {
        const imagesArray = images.map((image) => ({
            original: helper.getThumbnailUrl(
                image.image,
                themeSettings.bigThumbnailWidth,
            ),
            thumbnail: helper.getThumbnailUrl(
                image.image,
                themeSettings.previewThumbnailWidth,
            ),
            originalAlt:  name,
            thumbnailAlt: name,
        }));

        const showThumbnails = images.length > 1;

        return (
            <>
                <ImageGallery
                    lazyLoad
                    slideOnThumbnailHover
                    items = { imagesArray }
                    showBullets = { showThumbnails }
                    showFullscreenButton = { false }
                    showNav = { themeSettings.product_gallery_shownav === true }
                    showPlayButton = { false }
                    showThumbnails = { showThumbnails }
                    slideInterval = { 2000 }
                    thumbnailPosition = { themeSettings.product_thumbnail_position }
                    onClick = { openLightbox }
                    onSlide = { setPhotoIndex }
                />
            </>
        );
    }

    return <div className = 'large-image-placeholder' />;
};
