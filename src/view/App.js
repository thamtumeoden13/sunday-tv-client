import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import SignIn from '../component/SignIn'
import Home from './home/Home'

import { APOLLO_API_URL } from '../constant/config'


export default class App extends Component {

	componentDidMount() {
		console.log("componentDidMount");
	}
	onUserSelected = () => {
		console.log("onUserSelected", APOLLO_API_URL);
	}
	render() {

		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signin" component={SignIn} />
				</Switch>
			</BrowserRouter>
		)
	}
}
