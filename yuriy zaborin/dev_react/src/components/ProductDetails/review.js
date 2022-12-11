// eslint-disable-line
import React from 'react';

export const Review = (props) => {
    const { item, currentLang } = props;

    const rate = [];
    for (let i = 1; i <= 5; i++) {
        if (item.Rate < i) {
            rate.push('/assets/images/rating-star-small.png');
        } else {
            rate.push('/assets/images/rating-star-small-act.png');
        }
    }

    return (
        <div className = 'review'>
            <div className = 'review_header'>
                <div className = 'author'>{ item.AuthorName }</div>
                <img
                    alt = ''
                    className = 'logo'
                    src = { item.SourceSiteLogo }
                />
                <div className = 'rating'>
                    { window[ currentLang ].rating }
                    {
                        rate.map((src, index) => {
                            return (
                                <img
                                    alt = ''
                                    height = '16'
                                    key = { index }
                                    src = { src }
                                    width = '17'
                                />
                            );
                        })
                    }
                </div>
            </div>
            <div className = 'review_text'>
                { item.Feedback }
            </div>
            <div className = 'review_proff'>
                <div className = 'plus'>{ window[ currentLang ].reviewPros }</div>
                { item.Pros }
            </div>
            <div className = 'review_proff'>
                <div className = 'minus'>{ window[ currentLang ].reviewCons }</div>
                { item.Cons }
            </div>
        </div>
    );
};
