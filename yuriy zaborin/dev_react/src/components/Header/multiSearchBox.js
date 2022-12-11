// eslint-disable-line
import React, { useState, useRef, useCallback, useEffect } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import striptags from 'striptags';
import { debounce } from 'lodash';
import { api } from '../../Api';

export const MultiSearchBox = (props) => {
    const { currentLang } = props;
    const [ value, setValue ] = useState('');
    const [ hasFocus, setHasFocus ] = useState(false);
    const [ getSuggest, setGetSuggest ] = useState(true);
    const [ suggest, setSuggest ] = useState([]);
    const [ suggestActive, setSuggestActive ] = useState(-1);
    const inputRef = useRef(null);
    const suggestRef = useRef(null);

    const useOutsideAlerter = () => {
        function handleClickOutside(event) {
            if (suggestRef.current && !suggestRef.current.contains(event.target)) {
                setSuggest([]);
            }
        }

        useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        });
    };

    useOutsideAlerter();

    const getDataSuggest = async (value) => {
        const result = await api.multiSearchSuggest(value);
        if (result && result.results && result.results.suggest
            && result.results.suggest.length > 0) {
            const list = result.results.suggest.map((item)=>striptags(item));
            setSuggest(list);
            setSuggestActive(-1);
        }
    };

    const debounceLoadData = useCallback(debounce((value)=>getDataSuggest(value), 100), []);

    useEffect(() => {
        if (getSuggest && value.length > 0) {
            debounceLoadData(value);
        }
        if (!value || value.length === 0) {
            setSuggest([]);
        }
    }, [ value ]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSearch = (event) => {
        let value = event && event.target && event.target.value ? event.target.value : inputRef.current.value;
        if (value && value.length > 0) {
            value = value
                .replaceAll('#', '')
                .replaceAll('(', '')
                .replaceAll(')', '')
                .replaceAll('&', '%26')
                .replaceAll('-', ' ')
                .trim();
            props.history.push('/search/?s=' + value);
        }
        setSuggest([]);
    };

    const handleClear = () => {
        setValue('');
        setSuggest([]);
    };

    const handleKeyPress = (event) => {
        setGetSuggest(true);
        if (event.keyCode === 13 || event.which === 13) {
            handleSearch(event);
        }
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            handleClear();
        }
    };

    const handleFocus = () => {
        setHasFocus(true);
    };

    const handleBlur = () => {
        setHasFocus(false);
    };

    const suggestValue = (value) => {
        setGetSuggest(false);
        setValue(value);
        setSuggest([]);
        const event = {
            target: {
                value: value,
            },
        };
        handleSearch(event);
    };

    ArrowKeysReact.config({
        up: () => {
            if (suggestActive > 0 && suggest.length > 0) {
                setSuggestActive(suggestActive - 1);
            }
        },
        down: () => {
            if (suggestActive < suggest.length - 1 && suggest.length > 0) {
                setSuggestActive(suggestActive + 1);
            }
        },
    });

    useEffect(() => {
        if (suggest[ suggestActive ] && suggest[ suggestActive ] && suggest[ suggestActive ] !== value) {
            setGetSuggest(false);
            setValue(suggest[ suggestActive ]);
        }
    }, [ suggestActive ]);

    const suggestJSX = suggest.length > 0 ? suggest.map((item, index)=>(
        <div
            className = { index === suggestActive ? 'item active' : 'item' }
            key = { index }
            onClick = { () => suggestValue(item) }>
            <div
                className = 'text'
                dangerouslySetInnerHTML = {{__html: item }}
            />
        </div>
    )) : null;

    return (
        <div
            { ...ArrowKeysReact.events }
            className = { `search-box ${props.className}${
                hasFocus ? ' has-focus' : ''
            }` }>
            <input
                className = 'search-input'
                placeholder = { window[ currentLang ].search }
                ref = { inputRef }
                type = 'text'
                value = { value }
                onBlur = { handleBlur }
                onChange = { handleChange }
                onFocus = { handleFocus }
                onKeyDown = { handleKeyDown }
                onKeyUp = { handleKeyPress }
            />
            <button
                className = 'search-bth is-hidden-tablet'
                onClick = { handleSearch }>
                { window[ currentLang ].search }
            </button>
            <img
                alt = { window[ currentLang ].search }
                className = 'search-icon-search  is-hidden-mobile'
                src = '/assets/images/search.svg'
                title = { window[ currentLang ].search }
                onClick = { handleSearch }
            />
            {value && value !== '' && (
                <img
                    alt = 'search clear'
                    className = 'search-icon-clear'
                    src = '/assets/images/close.svg'
                    onClick = { handleClear }
                />
            )}
            {suggestJSX && (
                <div
                    className = 'search-suggest'
                    ref = { suggestRef }>
                    {suggestJSX}
                </div>
            )}
        </div>
    );
};
