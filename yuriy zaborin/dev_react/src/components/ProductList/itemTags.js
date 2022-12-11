// eslint-disable-line
import React from 'react';

const ItemTags = ({ tags }) => {
    if (tags && tags.length > 0) {
        return (
            <div className = 'tags'>
                {tags.map((tag, index) => (
                    <span
                        className = 'tag'
                        key = { index }>
                        {tag}
                    </span>
                ))}
            </div>
        );
    }

    return null;
};

export  { ItemTags };
