import React, { Component } from 'react'

import SignIn from '../component/SignIn'

import { APOLLO_API_URL } from '../constant/config'


export default class App1 extends Component {

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
			<div className='container'>
				<SignIn />
			</div>
		)
	}
}
