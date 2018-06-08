import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Client from 'shopify-buy';

const client = Client.buildClient({
    storefrontAccessToken: process.env.STORE_TOKEN,
    domain: process.env.DOMAIN
});


ReactDOM.render(<App client={client} />, document.getElementById('root'));

