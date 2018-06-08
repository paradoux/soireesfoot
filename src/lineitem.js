import React, { Component } from 'react';

class LineItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <li className="Line-item">
                <div className="Line-item__img">
                </div>
                <div className="Line-item__content">
                    <div className="Line-item__content-row">
                        <span className="Line-item__title">
                            {this.props.line_item.title}
                        </span>
                    </div>
                    <div className="Line-item__content-row">
                        <span className="Line-item__price">
                            {(this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2)} €
                        </span>
                        <button className="Line-item__remove" onClick={() => this.props.removeLineItemInCart(this.props.line_item.id)}>×</button>
                    </div>
                </div>
            </li>
        );
    }
}

export default LineItem;
