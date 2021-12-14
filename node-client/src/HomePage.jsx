import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <div style={{display: "none"}}>
                {user != null && user.name != null ? document.getElementById('logo').innerHTML = "Signed in as " + user.name : ""}
                {document.getElementById('linout').innerHTML = (user != null ? "Logout": "Login")}
            </div>
            <br />
            <h3><b>Ping Pong Rankings: </b></h3>
            <a href="/leaderboard">Current Leaderboard</a><br />
            <a href="/record">Record Results</a><br /><br />
            <h4><b>Instructions:</b></h4>
            <ul>
                <li>Sign in or create an account</li>
                <li>Go to the record tab to input results, or approve results sent to you</li>
                <li>Results require mutual approval to be put in the system, so one player must request a result, and the other must approve it. </li>
                <li>Ratings are updated hourly based on the <a href="http://www.glicko.net/glicko/glicko2.pdf">Glicko2</a> rating system.</li>
                <li>A '?' next to a rating means they have played less than 10 games (they will have a high deviation). </li>
            </ul>
        </div>
    );
}

export { HomePage };