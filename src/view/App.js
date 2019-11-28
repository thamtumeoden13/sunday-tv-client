import React, { Component, Fragment } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import gql from "graphql-tag";

import SignIn from '../component/SignIn'
import SignUp from '../component/SignUp'
import Home from './home/Home'

const App = (props) => {
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
