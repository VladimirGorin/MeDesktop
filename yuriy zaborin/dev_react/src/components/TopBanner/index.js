// eslint-disable-line
import React, { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';

export const TopBanner  = (props) => {
    const {authorized, component} = props;
    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        if (component === 'ProductDetails') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [ component ]);

    const handle = () =>{
        if (component === 'ProductDetails') {
            const button = document.getElementById('is-credit');
            if (button) {
                const top = button.offsetTop;
                button.classList.add('active');
                setTimeout(function() {
                    button.classList.remove('active');
                }, 5000);
                if (top) {
                    animateScroll.scrollTo(top, {duration: 500});
                }
            }
        }
    };
    return null //disabled
    return component !== 'Home' && !authorized ? (
        <div
            className = { `top_banner ${ isActive ? 'active' : ''}` }
            onClick = { () => handle() } >
            <img
                alt = ''
                src = '/assets/images/top_banner.jpg'
            />
        </div>
    ) : null;
};
