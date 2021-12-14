import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './_actions';
import './css/leaderboard.css';


function Leaderboard() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    return (
            
        <div>
            <div style={{display: "none"}}>
                {user != null && user.name != null ? document.getElementById('logo').innerHTML = "Signed in as " + user.name : ""}
                {document.getElementById('linout').innerHTML = (user != null ? "Logout": "Login")}
            </div>
            <div className="leaderboard">
                <h1>Current Leaderboard</h1>
                <ol>
                    {users.items ? 
                         users.items.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).map((user, index) =>
                            <li key={user.id}>
                                <mark>{user.name}</mark>
                                <small title={"RD: " + user.rd.toFixed(2)}>{user.total < 10 ? user.rating.toFixed(0) + "?": user.rating.toFixed(1)}</small>
                            </li>
                        )
                    : <p>No users yet.</p>}
                    
                </ol>
                </div>
        </div>
    );
}

export { Leaderboard };