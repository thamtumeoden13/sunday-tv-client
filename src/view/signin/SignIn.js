import React from 'react';

import SignInComponent from '../../component/SignIn'

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }


    componentDidMount() {
        console.log("SignIn");
    }

    render() {
        return (
            <SignInComponent />
        )
    }
}