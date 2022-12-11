// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { api } from '../../Api';

export const Page = (props) => {
    const { setSeoData, currentLang } = props;
    const [ page, setPage ] = useState({});
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        const getPage = async (currentLang) => {
            const path = window.location.pathname;
            const data = await api.getPage(path, currentLang);
            if (data) {
                const seoData = {
                    title:       data.title + ' | ' +  window[ currentLang ].seoTitle,
                    description: data.title + ' | ' +  window[ currentLang ].seoDescription,
                    metaTags:    [],
                    linkTags:    [],
                };
                setSeoData(seoData);
                setPage(data);
                setShow(true);
            }
        };
        getPage(currentLang);
    }, [ window.location.pathname, currentLang ]);

    return (
        show ? (
            <section className = 'section'>
                <div className = 'container'>
                    <div className = 'title is-12 has-text-centered'>
                        <h1>{page.title}</h1>
                    </div>
                    <div className = 'column is-12'>
                        <div
                            className = 'text'
                            dangerouslySetInnerHTML = {{ __html: page.description  }}
                        />
                    </div>
                </div>
            </section>
        ) : null
    );
};
