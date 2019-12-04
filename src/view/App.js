import React, { useState, Fragment, useEffect } from 'react'
import { Switch, Route, } from 'react-router-dom'

import { connect } from "react-redux";
import { setLoadingApp } from "../actions/appInfos";

import SignIn from './signin/SignIn'
import SignUp from './signup/SignUp'
import Home from './home/Home'

import RingLoader from 'react-spinners/RingLoader';
import { css } from '@emotion/core';
import LoadingOverlay from 'react-loading-overlay'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const mapStateToProps = state => {
	return {
		AppInfos: state.AppInfosModule,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setLoadingApp: isLoading => {
			dispatch(setLoadingApp(isLoading));
		},
	};
};

const App = (props) => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(props.AppInfos.loading)
	}, [props.AppInfos])

	return (
		<Fragment>
			<LoadingOverlay
				active={loading}
				spinner={<RingLoader
					css={override}
					sizeUnit={"px"}
					size={150}
					color={'#36D7B7'}
					loading={loading}
				/>}
				styles={{
					overlay: (base) => ({
						...base,
						background: 'rgba(0,0,0,0.5)'
					})
				}}
			>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signin" component={SignIn} />
					<Route path="/signup" component={SignUp} />
					<Route path="*" component={Home} />
				</Switch>
			</LoadingOverlay>
		</Fragment>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
