import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Client from 'shopify-buy';

const client = Client.buildClient({
    storefrontAccessToken: 'af3d0fb0b6fc6a7fcb5d15fa353293b5',
    domain: 'soireesfoot.myshopify.com'
});


ReactDOM.render(<App client={client} />, document.getElementById('root'));

