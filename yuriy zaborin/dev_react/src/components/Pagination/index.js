// eslint-disable-line
import React from 'react';
import { Link } from 'react-router-dom';

import Styles from './styles.module.css';

export const Pagination = (props) => {
    const page = props.page || 1;
    const limit = props.limit || 10;
    const total = props.total || limit;

    const iterations = Math.ceil(total / limit);

    const show = iterations > 1;

    const setDiffPage = () => {
        return false;
    };

    const createPagination = () => {
        let pagesToShow = [];
        if (iterations > 5) {
            pagesToShow = [ 1, 2 ];
            if (page <= 5 && iterations !== page) {
                for (let i = 3; i <= 5; i++) {
                    if (pagesToShow.indexOf(i) === -1) {
                        pagesToShow.push(i);
                    }
                }
            }
            if (page > 5 && iterations !== page) {
                let downs = 2;
                if (page === iterations - 1) {
                    downs = 3;
                }
                for (let i = downs; i > 0; i--) {
                    const iterPage = page - i;
                    if (iterPage > 2 && pagesToShow.indexOf(iterPage) === -1) {
                        pagesToShow.push(iterPage);
                    }
                }
                if (page < iterations - 1 && pagesToShow.indexOf(page) === -1) {
                    pagesToShow.push(page);
                }
                for (let i = 1; i < 3; i++) {
                    const iterPage = page + i;
                    if (iterPage < iterations - 1 && pagesToShow.indexOf(iterPage) === -1) {
                        pagesToShow.push(iterPage);
                    }
                }
            }
            if (page === 5 && iterations > 5 && pagesToShow.indexOf(page + 1) === -1) {
                pagesToShow.push(page + 1);
            }
            if (page === iterations && iterations > 5) {
                for (let i = 4; i > 0; i--) {
                    const iterPage = iterations - i;
                    if (iterPage < iterations - 1 && pagesToShow.indexOf(iterPage) === -1) {
                        pagesToShow.push(iterPage);
                    }
                }
            }
            if (iterations > 3) {
                if (pagesToShow.indexOf(iterations - 1) === -1) {
                    pagesToShow.push(iterations - 1);
                }
                if (pagesToShow.indexOf(iterations) === -1) {
                    pagesToShow.push(iterations);
                }
            }
        } else {
            for (let i = 1; i <= iterations; i++) {
                if (pagesToShow.indexOf(i) === -1) {
                    pagesToShow.push(i);
                }
            }
        }

        let rows = pagesToShow.map((i, index) => {
            let href = window.location.pathname.replace(/\/page-[0-9]+\//, '/');
            if (i > 1) {
                href = href + 'page-' + i + '/';
            }
            //if (window.location.hash.indexOf('#options=') !== -1 && window.location.hash !== '#options=') {
                href += window.location.search;
                href += window.location.hash;
            //}

            const currentClass = page === i ? Styles.active : null;

            let showDots = false;
            if (index > 0 && i - pagesToShow[ index - 1 ] > 1) {
                showDots = true;
            }

            return (
                <React.Fragment
                    key = { i }>
                    { showDots
                        ? (
                            <li>
                                <span
                                    onClick = { setDiffPage }>
                            ...
                                </span>
                            </li>
                        )
                        : null
                    }
                    <li>
                        <Link
                            className = { currentClass }
                            to = { href }
                            onClick = { () => props.setPage(i) }>
                            { i }
                        </Link>
                    </li>
                </React.Fragment>
            );
        });

        return rows;
    };

    return (
        show ? (
            <div className = { Styles.pagination_wrap }>
                <ul className = { Styles.pagination }>
                    { createPagination() }
                </ul>
            </div>
        ) : null
    );
};
