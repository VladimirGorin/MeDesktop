// eslint-disable-line
import { useEffect } from 'react';
import { animateScroll } from 'react-scroll';

export const ScrollToTop = ({ children, location: { pathname } }) => {
    useEffect(() => {
        animateScroll.scrollToTop({duration: 100});
    }, [ pathname ]);

    return children || null;
};
