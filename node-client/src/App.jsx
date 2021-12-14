import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { HomePage } from './HomePage.jsx';
import { LoginPage } from './LoginPage.jsx';
import { RegisterPage } from './RegisterPage.jsx';
import { Leaderboard } from './Leaderboard';
import { Elements } from './Elements';
import { Record } from './Record';

import './assets/css/main.css';
import $ from 'jquery'; 

import './assets/css/fontawesome-all.min.css';
import './assets/js/breakpoints.min.js';
import './assets/js/browser.min.js';
//import './assets/js/jquery.dropotron.min.js';
import './assets/js/jquery.min.js';
//import './assets/js/jquery.scrollex.min.js';
//import './assets/js/jquery.scrolly.min.js';
//import './assets/js/main.js';
//import './assets/js/util.js';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="text-secondary">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/leaderboard" component={Leaderboard} />
                            {/* <Route path="/elements" component={Elements} /> */}
                            <PrivateRoute exact path="/record" component={Record} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };