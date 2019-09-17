import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Dashboard from '../dashboard/Dashboard'

export default class HomeScreen extends Component {

    state = {
        loading: true,
        uploading: false,
        images: []
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    render() {

        return (

            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                </Switch>
                <div className='container'>

                </div>
            </React.Fragment>
        )
    }
}