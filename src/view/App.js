import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import SignIn from '../component/SignIn'
import Home from './home/Home'

import { APOLLO_API_URL } from '../constant/config'


export default class App extends Component {

	state = {
		loading: true,
		uploading: false,
		images: []
	}

	componentDidMount() {
		console.log("componentDidMount");
	}
	onUserSelected = () => {
		console.log("onUserSelected", APOLLO_API_URL);
	}
	render() {

		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signin" component={SignIn} />
				</Switch>
			</React.Fragment>
		)
	}
}
