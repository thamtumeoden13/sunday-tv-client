import React, { Component, Fragment } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import gql from "graphql-tag";

import SignIn from '../component/SignIn'
import SignUp from '../component/SignUp'
import Home from './home/Home'

const App = (props) => {
	// const { loading, error, data } = useQuery(IS_LOGGED_IN);
	// const client = useApolloClient();
	// const { loading, error, data } = client.readQuery({ query: IS_LOGGED_IN })
	// if (loading) return <p>loading...</p>;
	// if (error) return <p>ERROR: {error.message}</p>;
	// console.log({ data })
	// const isLoggedIn = !!localStorage.getItem(AUTH_TOKEN)
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/signin" component={SignIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="*" component={Home} />
		</Switch>
	)
}
export default App;
