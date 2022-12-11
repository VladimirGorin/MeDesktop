// eslint-disable-line
import React from 'react';

export const NoMatch = ({currentLang}) => {
    return (
        <section className = 'section'>
            <div className = 'container'>
                <div className = 'title is-12 has-text-centered'>
                    <h1>{window[ currentLang ].title404}</h1>
                </div>
                <div className = 'column is-8 is-offset-2'>
                    <div className = 'text  has-text-centered'>
                        <p>{window[ currentLang ].text404}</p>
                        <p>{window[ currentLang ].text404Row2}</p>
                        <p>{window[ currentLang ].text404Row3}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
