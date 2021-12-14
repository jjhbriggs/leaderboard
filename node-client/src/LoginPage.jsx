import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './_actions';

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }
    function redirectRegister(){
        window.location.href = "/register";
    }

    return (
        <div className="col-lg-4 offset-lg-2">
            <div style={{display: "none"}}>
\                {document.getElementById('linout').innerHTML = "Login"}
            </div>
            <br />
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username"  className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    
                    {submitted && !username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                    
                </div>
                <br />
                <div className="form-group">
                    <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    
                    {submitted && !password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                    
                </div>
                <br />
                <div className="form-group">
                    <div className="col-12">
                        <ul className="actions">
                            <li>{loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        <input type="submit" value="Login" className="primary" /></li>
                            <li><input type="button" onClick={redirectRegister} value="Register Instead" /></li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };