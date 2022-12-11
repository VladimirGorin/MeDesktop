// eslint-disable-line
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Item } from '../../components';

const ProductSlider = (props) => {
    const {
        products,
        addToCart,
        settings,
        columnCountOnMobile,
        columnCountOnTablet,
        columnCountOnDesktop,
        columnCountOnWidescreen,
        columnCountOnFullhd,
        isManager,
        fixedRowCount,
    } = props;
    const items = products && products.length > 0
        ? products.map((product) => (
            <Item
                { ...props }
                addToCart = { addToCart }
                columnCountOnDesktop = { columnCountOnDesktop }
                columnCountOnFullhd = { isManager && !fixedRowCount ? 3 : columnCountOnFullhd }
                columnCountOnMobile = { columnCountOnMobile }
                columnCountOnTablet = { columnCountOnTablet }
                columnCountOnWidescreen = { columnCountOnWidescreen }
                itemClassName = 'column slider-product'
                key = { product.id }
                product = { product }
                settings = { settings }
            />
        )) : null;

    const carouselProps = {
        infinite:       true,
        speed:          500,
        slidesToShow:   products.length > 4 ? 4 : products.length,
        slidesToScroll: 1,
        centerPadding:  0,
        draggable:      false,
        responsive:     [
            {
                breakpoint: 1024,
                settings:   {
                    slidesToShow:   products.length > 4 ? 4 : products.length,
                    slidesToScroll: 1,
                    infinite:       true,
                },
            },
            {
                breakpoint: 600,
                settings:   {
                    slidesToShow:   products.length > 2 ? 2 : products.length,
                    slidesToScroll: 1,
                    infinite:       true,
                },
            },
            {
                breakpoint: 480,
                settings:   {
                    slidesToShow:   1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider
            { ...carouselProps }
            className = 'products'>
            {items}
        </Slider>
    );
};

export { ProductSlider };
