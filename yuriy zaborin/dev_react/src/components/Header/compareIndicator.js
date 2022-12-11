// eslint-disable-line
import React from 'react';

const CompareCount = (props) => {
    const { compareCount } = props;

    if (compareCount && compareCount > 0) {
        return <span className = 'compare-count'>{compareCount}</span>;
    }

    return null;
};

const CompareIcon = ({ compareIsActive, currentLang }) => {
    if (compareIsActive) {
        return (
            <img
                alt = { window[ currentLang ].close }
                className = 'icon'
                src = '/assets/images/close.svg'
                style = {{ minWidth: 24, padding: 4 }}
                title = { window[ currentLang ].close }
            />
        );
    }

    return (
        <img
            alt = { window[ currentLang ].compare }
            className = 'icon'
            src = '/assets/images/compare.svg'
            style = {{ minWidth: 24 }}
            title = { window[ currentLang ].compare }
        />
    );
};

export const CompareIndicator  = (props) => {
    const { onClick, compareIsActive, currentLang } = props;

    return (
        <span
            className = 'compare-button'
            onClick = { onClick }>
            <CompareIcon
                compareIsActive = { compareIsActive }
                currentLang = { currentLang }
            />
            <CompareCount { ...props } />
        </span>
    );
};
