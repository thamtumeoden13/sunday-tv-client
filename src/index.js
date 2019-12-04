import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'

import { createBrowserHistory } from "history";

import { Provider } from 'react-redux';
import store from './stores';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { onError } from "apollo-link-error";
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'

import App from './view/App'

import { APOLLO_API_URL, AUTH_TOKEN } from './constant/config'
const history = createBrowserHistory()

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
const cache = new InMemoryCache();

const httpLink = new HttpLink({
    uri: APOLLO_API_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})
const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Infinity,
        jitter: true
    },
    attempts: {
        max: 5,
        retryIf: (error, _operation) => !!error
    }
});
const error = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path, extensions }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, extensions: ${extensions.code}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
    // if (graphQLErrors) {
    //     for (let err of graphQLErrors) {
    //         switch (err.extensions.code) {
    //             case 'UNAUTHENTICATED':
    //                 // error code is set to UNAUTHENTICATED
    //                 // when AuthenticationError thrown in resolver

    //                 // modify the operation context with a new token
    //                 const oldHeaders = operation.getContext().headers;
    //                 operation.setContext({
    //                     headers: {
    //                         ...oldHeaders,
    //                         authorization: getNewToken(),
    //                     },
    //                 });
    //                 // retry the request, returning the new observable
    //                 return forward(operation);
    //             default:
    //                 return;
    //         }
    //     }
    // }
    // if (networkError) {
    //     console.log(`[Network error]: ${networkError}`);
    //     // if you would also like to retry automatically on
    //     // network errors, we recommend that you use
    //     // apollo-link-retry
    // }
});
// const link = ApolloLink.concat(authLink, httpLink);
const link = ApolloLink.from([
    retryLink,
    authLink,
    error,
    httpLink
]);

const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: link,
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
