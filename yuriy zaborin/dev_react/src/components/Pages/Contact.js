// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { ServiceBtn } from '../../components';

export const Contact = (props) => {
    const { setSeoData, config, currentLang } = props;
    const [ page, setPage ] = useState({});
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        const seoData = {
            title:       window[ currentLang ].contactsSeo  + ' | ' +  window[ currentLang ].seoTitle,
            description: window[ currentLang ].contactsSeo  + ' | ' +  window[ currentLang ].seoDescription,
            metaTags:    [],
            linkTags:    [],
        };
        setSeoData(seoData);
        setPage(config);
        setShow(true);
    }, [ ]);

    const leftClass = 'column is-4';
    const rightClass = 'column is-8';


    return (
        show ? (
            <section className = 'section'>
                <div className = 'container'>
                    <div className = 'columns'>
                        <div className = 'title is-12 has-text-centered'>
                            <h1>{ window[ currentLang ].contactsPage }</h1>
                        </div>
                    </div>
                    <div className = 'columns'>
                        <div className = { leftClass }>
                            <div className = 'legend mb15'>
                                { window[ currentLang ].contacts_label1 }
                            </div>
                            <div
                                className = 'text'
                                dangerouslySetInnerHTML = {{ __html: page.config_contact_1  }}
                            />
                        </div>
                        <div className = { leftClass }>
                            <div className = 'legend mb15'>
                                { window[ currentLang ].contacts_label2 }
                            </div>
                            <div
                                className = 'text'
                                dangerouslySetInnerHTML = {{ __html: page.config_address  }}
                            />
                        </div>
                        <div className = { leftClass }>
                            <ServiceBtn
                                { ...props }
                            />
                        </div>
                    </div>
                    <div className = 'columns'>
                        <div className = { leftClass }>
                            <div
                                className = 'text mb15'
                                dangerouslySetInnerHTML = {{ __html: page.config_contact_2  }}
                            />
                            <div
                                className = 'text mb15'
                                dangerouslySetInnerHTML = {{ __html: page.config_contact_3  }}
                            />
                            <div className = 'legend'>
                                { window[ currentLang ].contacts_label3 }
                            </div>
                            <div
                                className = 'text mb15'
                                dangerouslySetInnerHTML = {{ __html: page.config_fax  }}
                            />
                            <div className = 'legend'>
                                { window[ currentLang ].contacts_label4 }
                            </div>
                            <a
                                className = 'text mb15'
                                href = { 'mailto:' + page.config_email }>
                                { page.config_email }
                            </a>
                            <div className = 'legend'>
                                { window[ currentLang ].contacts_label5 }
                            </div>
                            <a
                                className = 'text'
                                href = { 'mailto:' + page.config_email_service }>
                                { page.config_email_service }
                            </a>
                        </div>
                        <div className = { rightClass }>
                            <div
                                className = 'text map'
                                dangerouslySetInnerHTML = {{ __html: page.config_geocode  }}
                            />
                        </div>
                    </div>
                    <div className = 'columns'>
                        <div className = { leftClass }>
                            <div className = 'legend'>
                                { window[ currentLang ].contacts_label6 }
                            </div>
                        </div>
                        <div className = { rightClass }>
                            <div
                                className = 'text'
                                dangerouslySetInnerHTML = {{ __html: page.config_comment  }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        ) : null
    );
};
