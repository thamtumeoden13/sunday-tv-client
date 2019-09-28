import React, { Component, Fragment } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import SignIn from '../component/SignIn'
import SignUp from '../component/SignUp'
import Home from './home/Home'
import NotFound from './notfound/NotFound'

import { APOLLO_API_URL } from '../constant/config'


export default class App extends Component {
	constructor(props) {
		super(props);
		this.stat = {

		}
	}

	componentDidMount() {
		console.log("componentDidMount", this.props);
	}
	onUserSelected = () => {
		console.log("onUserSelected", APOLLO_API_URL);
	}
	render() {

		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route path="*" component={Home} />
			</Switch>
		)
	}
}
