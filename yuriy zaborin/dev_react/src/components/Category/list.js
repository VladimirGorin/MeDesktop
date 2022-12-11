// eslint-disable-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ItemImage } from '../../components';
import { themeSettings } from '../../lib/settings';

export const CategoriesList = (props) => {
    const { items } = props;
    const imageSize = themeSettings.categoryThumbnailWidth;
    const list = items && items.length > 0 ? items.map((item)=>{
        return (
            <div
                className = 'catalog_box'
                key = { item.id }>
                <div className = 'inner'>
                    <div className = 'catalog_border'>
                        <NavLink to = { item.path }>
                            <span className = 'thumb'>
                                <ItemImage
                                    height = '200'
                                    image = { item.image }
                                    productName = { item.name }
                                    size = { imageSize }
                                />
                            </span>
                            <span className = 'cat_name'>
                                {item.name}
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }) : null;

    return (
        <div className = 'catalog_page'>
            {list}
        </div>
    );
};
