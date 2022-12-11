// eslint-disable-line
import React from 'react';
import { Title, Link, Meta } from 'react-head';
export const MetaTags = (props) => {
    const data = props.data || {};
    const tags =  data.metaTags || [];
    const links =  data.linkTags || [];

    const metaTagsJSX = tags
        ? tags.map((tag, t) => {
            return (
                <Meta
                    content = { tag.content }
                    key = { t }
                    name = { tag.property }
                />
            );
        })
        : null;

    const metaLinksJSX = links
        ? links.map((tag, l) => {
            return (
                <Link
                    content = { tag.content }
                    key = { l }
                    rel = { tag.property }
                />
            );
        })
        : null;

    const result =  data.title ? (
        <>
            <Title>{ (data.title || '') + ' | Comtrading.ua' }</Title>
            <Meta
                content = { data.description }
                name = 'description'
            />
            { metaTagsJSX }
            { metaLinksJSX }
        </>
    ) : null;

    return result;
};
