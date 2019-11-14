import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
// import App1 from './view/App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'

import { createBrowserHistory } from "history";

import { Provider } from 'react-redux';
import store from './stores';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'

import App from './view/App'

import { APOLLO_API_URL, AUTH_TOKEN } from './constant/config'
const history = createBrowserHistory()
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
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})
const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    // link: link,
    link: authLink.concat(link),

    // Provide some optional constructor fields
    // name: 'react-web-client',
    // version: '1.3',
    queryDeduplication: false,
    defaultOptions: defaultOptions,
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem(AUTH_TOKEN),
    },
});

const AppRoot = () => (
    <Router history={history}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </Router>
);
ReactDOM.render(<AppRoot />, document.getElementById('root'))
registerServiceWorker()
