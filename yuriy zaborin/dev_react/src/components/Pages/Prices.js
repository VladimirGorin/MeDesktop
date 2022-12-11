// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { api } from '../../Api';

export const Prices = (props) => {
    const { setSeoData, currentLang, categories } = props;
    const [ page, setPage ] = useState([]);
    const [ show, setShow ] = useState(false);

    const topCategories = categories && categories.length > 0 ? categories.filter((item) => item.parent_id === 0) : null;

    useEffect(() => {
        const getPage = async () => {
            const data = await api.getPrices();
            if (data) {
                const seoData = {
                    title:       window[ currentLang ].prices,
                    description: window[ currentLang ].prices,
                    metaTags:    [],
                    linkTags:    [],
                };
                setSeoData(seoData);
                setPage(data);
                setShow(true);
            }
        };
        getPage();
    }, [ ]);

    const pricesJSX = page && page.length > 0 && topCategories ? topCategories.map((item, index)=>{
        const link = page.find((el)=>el.indexOf(item.slug) !== -1);


        return link ? (
            <div key = { index }>
                <a href = { link }>
                    {item.name}
                </a>
            </div>
        ) : null;
    }) : null;

    return (
        show ? (
            <section className = 'section'>
                <div className = 'container'>
                    <div className = 'title is-12 has-text-centered'>
                        <h1>{window[ currentLang ].prices}</h1>
                    </div>
                    <div className = 'column is-12'>
                        <div className = 'prices'>
                            { pricesJSX }
                        </div>
                    </div>
                </div>
            </section>
        ) : null
    );
};
