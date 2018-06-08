import React, { Component } from 'react';

import Cart from './cart';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      collections: [],
      isCartOpen: false,
      checkout: { lineItems: [] },
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.displayProduct = this.displayProduct.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
  }

  componentWillMount() {
    this.props.client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
    });
    this.props.client.collection.fetchAllWithProducts().then((res) => {
      this.setState({
        collections: res,
      });
    });
  }


  componentDidMount() {
    return this.state.collections.map((collection) => {
      return this.displayProduct(collection);
    })
  }

  addProductToCart(variantId) {
    this.setState({
      isCartOpen: true,
    });
    const lineItems = [{ variantId, quantity: 1 }];
    const checkoutId = this.state.checkout.id;
    return this.props.client.checkout.addLineItems(checkoutId, lineItems).then((checkout) => {
      this.setState({
        checkout: checkout,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]
    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  displayProduct(collection) {
    {
      return collection.products.map((product) => {
        return (
          <div className="col-sm-8 col-md-6 col-lg-4">
            <button className="card" onClick={() => { this.addProductToCart(product.variants[0].id) }}>
              <div className="img-top"></div>
              <div id="teams">
                <img className="img-team" src={product.images[0].src} alt="" />
                <p>{product.title} </p>
                <img className="img-team" src={product.images[1].src} alt="" />
              </div>
              <div className="button-bottom">{collection.title}</div>
            </button>
          </div>
        )
      })
    }
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-md-12">
            <div className="landing-banner">
              <header className="App__header">
                {!this.state.isCartOpen &&
                  <div className="App__view-cart-wrapper">
                    <button className="App__view-cart" onClick={() => this.setState({ isCartOpen: true })}>
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                }
                <div className="landing-banner">
                  <div className="landing-title"></div>
                  <h1 className="landing-title">Soirées Foot</h1>
                  <a className="header-concept" href="#concept"> Le concept</a>
                  <a className="header-matchs" href="#teams"> Les matchs</a>
                </div>
              </header>
            </div>
          </div>
        </div>
        <div className="row no-gutters">
          <div id="concept">
            <h1 className="concept-title">Le concept</h1>
            <div className="icons">
              <div className="projecteur">
                <img src="https://png.icons8.com/ios/100/000000/video-projector-filled.png" />
                <p>Un projecteur pour des matchs en vrai grand écran</p>
              </div>
              <div className="fatboys">
                <img src="https://png.icons8.com/ios/100/000000/living-room-filled.png" />
                <p>Deux fatboys pour mettre tout le monde à l'aise</p>

              </div>
              <div className="livraison">
                <img src="https://png.icons8.com/ios/100/000000/in-transit-filled.png" />
                <p>Le tout livré 40 minutes avant le match et récupéré 20 minutes après</p>

              </div>
              <div className="prix">
                <img src="https://png.icons8.com/ios/100/000000/low-price-euro-filled.png" />
                <p>Le meilleur plan de ce mondial pour 35 euros</p>
              </div>
            </div>

            {/*   <p>Livraison d'un pack Projecteur + Fatboys 40 minutes avant le coup d'envoi
          <br />
              Récupéré le soir même 20 minutes après la fin du match</p> */}
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <h1 className="matchs-title">Les  Matchs</h1>
            {this.componentDidMount()}
          </div>
        </div>

        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </div>

    );
  }
}

export default App;
