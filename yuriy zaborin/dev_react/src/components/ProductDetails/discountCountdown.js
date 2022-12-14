// eslint-disable-line
import React from 'react';

export default class DiscountCountdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            diff:  null,
        };
    }

    componentDidMount() {
        const timer = setInterval(this.tick, 1000);
        this.setState({
            timer,
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

tick = () => {
    const dateNow = new Date();
    const dateTo = new Date(this.props.product.date_sale_to);
    const diff = Math.abs(
        Math.floor((dateTo.getTime() - dateNow.getTime()) / 1000),
    );

    this.setState({
        diff,
    });
};

pad = (num) => num < 10 ? `0${num}` : num;

render() {
    const { product } = this.props;
    const { diff } = this.state;

    if (product) {
        const days = Math.floor(diff / (24 * 60 * 60));
        let leftSec = diff - (days * 24 * 60 * 60);

        const hrs = Math.floor(leftSec / (60 * 60));
        leftSec -= hrs * 60 * 60;

        const min = Math.floor(leftSec / 60);
        leftSec -= min * 60;

        return (
            <div className = 'discount-countdown'>
                <div className = 'discount-title'>{window[ this.props.currentLang ].saleEnds}:</div>

                <div
                    className = 'columns is-mobile has-text-centered discount-numbers is-gapless'
                    style = {{ margin: '8px 0' }}>
                    <div className = 'column is-2'>{this.pad(days)}</div>
                    <div className = 'column is-1'>:</div>
                    <div className = 'column is-2'>{this.pad(hrs)}</div>
                    <div className = 'column is-1'>:</div>
                    <div className = 'column is-2'>{this.pad(min)}</div>
                    <div className = 'column is-1'>:</div>
                    <div className = 'column is-2'>{this.pad(leftSec)}</div>
                </div>

                <div className = 'columns is-mobile has-text-centered discount-labels is-gapless'>
                    <div className = 'column is-2'>{window[ this.props.currentLang ].days}</div>
                    <div className = 'column is-1' />
                    <div className = 'column is-2'>{window[ this.props.currentLang ].hours}</div>
                    <div className = 'column is-1' />
                    <div className = 'column is-2'>{window[ this.props.currentLang ].minutes}</div>
                    <div className = 'column is-1' />
                    <div className = 'column is-2'>{window[ this.props.currentLang ].seconds}</div>
                </div>
            </div>
        );
    }

    return null;
}
}
