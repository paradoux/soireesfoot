import React, { Component } from 'react';
import LineItem from './lineitem';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.openCheckout = this.openCheckout.bind(this);
    }

    openCheckout() {
        window.open(this.props.checkout.webUrl);
    }

    render() {
        let line_items = this.props.checkout.lineItems.map((line_item) => {
            return (
                <LineItem
                    removeLineItemInCart={this.props.removeLineItemInCart}
                    key={line_item.id.toString()}
                    line_item={line_item}
                />
            );
        });

        return (
            <div className={`Cart ${this.props.isCartOpen ? 'Cart--open' : ''}`}>
                <header className="Cart__header">
                    <h2>Vos Soirées</h2>
                    <button
                        onClick={this.props.handleCartClose}
                        className="Cart__close">
                        ×
          </button>
                </header>
                <ul className="Cart__line-items">
                    {line_items}
                </ul>
                <footer className="Cart__footer">
                    <div className="Cart-info clearfix">
                        <div className="Cart-info__total Cart-info__small">Sous-Total</div>
                        <div className="Cart-info__pricing">
                            <span className="pricing">{this.props.checkout.subtotalPrice} €</span>
                        </div>
                    </div>
                    <div className="Cart-info clearfix">
                        <div className="Cart-info__total Cart-info__small">Total</div>
                        <div className="Cart-info__pricing">
                            <span className="pricing">{this.props.checkout.totalPrice} €</span>
                        </div>
                    </div>
                    <button className="Cart__checkout button" onClick={this.openCheckout}>Validez votre soirée !</button>
                </footer>
            </div>
        )
    }
}

export default Cart;