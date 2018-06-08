import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Client from 'shopify-buy';

const client = Client.buildClient({
    storefrontAccessToken: 'tobesetup',
    domain: 'soireesfoot.myshopify.com'
});


ReactDOM.render(<App client={client} />, document.getElementById('root'));

