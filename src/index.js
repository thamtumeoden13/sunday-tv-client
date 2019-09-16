import React from 'react'
import ReactDOM from 'react-dom'
import App from './view/App'
// import App1 from './view/App'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { APOLLO_API_URL } from './constant/config'

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: APOLLO_API_URL,
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
    mutate: {
        errorPolicy: 'all',
    },
};
const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: link,

    // Provide some optional constructor fields
    name: 'react-web-client',
    version: '1.3',
    queryDeduplication: false,
    defaultOptions: defaultOptions,
});

const AppRoot = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
ReactDOM.render(<AppRoot />, document.getElementById('root'))
registerServiceWorker()
