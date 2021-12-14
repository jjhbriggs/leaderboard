import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './_actions';
import { matchActions } from './_actions';
import './css/leaderboard.css';


function Record() {
    const matches = useSelector(state => state.matches);
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        player: '',
        result: ''
    });
    const { player, result } = inputs;
    const [submitted, setSubmitted] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);

    useEffect(() => {
        dispatch(matchActions.getAll());
    }, []);
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleUpdateMatch(match) {
        match.approved = "true";
        dispatch(matchActions.update(match));
    }
    function handleDeleteMatch(id) {
        dispatch(matchActions.delete(id));
    }
    function invertResult(result){
        if(result == "WON"){
            return "LOST";
        }else if(result == "LOST"){
            return "WON";
        }
        return result;
    }
    function getWinner(t_match){
        if(t_match.result == "WON"){
            return t_match.user_from
        }else if(t_match.result == "LOST"){
            return t_match.user_to
        }
        return "UNDEFINED"
    }
    function getLoser(t_match){
        if(t_match.result == "LOST"){
            return t_match.user_from
        }else if(t_match.result == "WON"){
            return t_match.user_to
        }
        return "UNDEFINED"
    }
    function getOtherPlayer(first, second, third){
        if(first==second){
            return third;
        }else if(first==third){
            return second;
        }
        return first;
    }
    function nameFromUsername(username){
        if(!users.loading && !users.error){
            for (const l_user of users.items){
                if(l_user.username == username){
                    return l_user.name;
                }
            }
        }
        return "loading...";
    }
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        
        if (player && result) {
            let found = false;
            for (const l_user of users.items){
                if(l_user.username == player && l_user.username != user.username){
                    found = true;
                }
            }
            if(!found){
                setInvalidUser(true);
                return;
            }
            const matchResult = {
                "user_from": user.username,
                "user_to": player,
                "approved": "false",
                "executed": "false",
                "result": result
            }
            console.log(matchResult);
            dispatch(matchActions.register(matchResult));
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setInvalidUser(false);
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    return (  
        <div className="col-lg-8 offset-lg-2">
            <div style={{display: "none"}}>
                {user != null && user.name != null ? document.getElementById('logo').innerHTML = "Signed in as " + user.name : ""}
                {document.getElementById('linout').innerHTML = (user != null ? "Logout": "Login")}
            </div>
            <form name="form" onSubmit={handleSubmit}>
                <br />
                <p>When recording results, input the players <b>USERNAME</b> (ask them for it, this is not their name) and result and click submit. The other player can then come to this page to approve the result.</p>
            <div class="row">
                <div className="form-group col-4">

                    <input type="text" name="player" value={player} onChange={handleChange} placeholder="Player played (username)"  className={'form-control' + (submitted && !player ? ' is-invalid' : '')} />
                    {submitted && invalidUser &&
                        <div className="invalid-feedback">That username does not exist</div>
                    }
                    {submitted && !player &&
                        <div className="invalid-feedback">Player played is required</div>
                    }
                </div>
                <div className="form-group col-4">
                {/* <input type="text" name="result" value={result} onChange={handleChange} placeholder="Result"  className={'form-control' + (submitted && !player ? ' is-invalid' : '')} /> */}
                    <select name="result" id="result" onChange={handleChange} className={'form-control' + (submitted && !player ? ' is-invalid' : '')} >
                        <option value="">- RESULT -</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                    </select>                  
                    {submitted && !result &&
                        <div className="invalid-feedback">Result is required</div>
                    }
                </div>
                <div className="form-group">
                    <div className="col-12">
                        <input type="submit" value="Submit" className="primary" />
                    </div>
                </div>
                </div>
            </form>

            <div className="table-wrapper">
            <table>
                    <thead>
                        <tr>
                            <th>Your Results</th>
                            <th>All Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
            <tr>
                <td>{matches.loading && <em>Loading matches...</em>}
                {matches.error && <span className="text-danger">ERROR: {matches.error}</span>}
                {matches.items &&
                    <ul className="alt">
                        {matches.items.slice().reverse().map((match, index) =>
                            match.approved == "false" ? 
                                match.user_to == user.username ? 
                                <li key={match.id}>
                                    {nameFromUsername(match.user_from)} claims that you <span style={invertResult(match.result) == "WON" ? {color: "lawngreen"}
                                        : {color: "red"}
                                    }>{invertResult(match.result)}</span> against them on {(new Date(match.createdAt)).toDateString()}
                                    {
                                        match.updating ? <em> - Updating...</em>
                                        : match.updateError ? <span className="text-danger"> - ERROR: {match.updateError}</span>
                                        : <span>- <a onClick={() => handleUpdateMatch(match)} className="text-secondary">APPROVE</a> - <a onClick={() => handleDeleteMatch(match.id)} className="text-primary">REJECT</a></span>
                                    }
                                </li> 
                                : match.user_from == user.username ? 
                                <li key={match.id}>
                                You claimed that you <span style={match.result == "WON" ? {color: "lawngreen"}
                                        : {color: "red"}
                                    }>{match.result}</span> against {nameFromUsername(match.user_to)} on {(new Date(match.createdAt)).toDateString()} (waiting for their approval)
                                </li> 
                                : null
                                
                            : match.user_from == user.username ?
                                <li key={match.id}>
                                    You  <span style={match.result == "WON" ? {color: "lawngreen"}
                                        : {color: "red"}
                                    }>{match.result}</span> against {nameFromUsername(getOtherPlayer(match.user_from,match.user_to,user.username))} on {(new Date(match.createdAt)).toDateString()}
                                </li>
                            : <li key={match.id}>
                                You  <span style={invertResult(match.result) == "WON" ? {color: "lawngreen"}
                                    : {color: "red"}
                                }>{invertResult(match.result)}</span> against {nameFromUsername(getOtherPlayer(match.user_from,match.user_to,user.username))} on {(new Date(match.createdAt)).toDateString()}
                            </li>
                        )}
                    </ul>
                }</td>
                <td>
                {matches.loading && <em>Loading matches...</em>}
                {matches.error && <span className="text-danger">ERROR: {matches.error}</span>}
                {matches.items &&
                    <ul className="alt">
                        {matches.items.slice().reverse().map((match, index) =>
                            match.approved == "true" ? 
                            <li key={match.id}>
                                {nameFromUsername(getWinner(match))} won against {nameFromUsername(getLoser(match))} on {(new Date(match.createdAt)).toDateString()}
                            </li> : null
                        )}
                    </ul>
                }
                </td>
            </tr>
            </tbody>
            </table>
            </div>
        </div>
    );
}

export { Record };