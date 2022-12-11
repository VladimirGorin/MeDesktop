// eslint-disable-line
import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

const withProfile = (Enhanceble) => {
    return class withProfile extends Component {
        render() {
            return (
                <Consumer>
                    {(context) => <Enhanceble { ...context } { ...this.props} />}
                </Consumer>
            );
        }
    };
};

export { Provider, Consumer, withProfile };
