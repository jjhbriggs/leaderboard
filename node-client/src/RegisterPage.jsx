import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.name && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }
    function redirectLogin(){
        window.location.href = "/login";
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <br />
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} />
                    {submitted && !user.name &&
                        <div className="invalid-feedback">Name is required</div>
                    }
                </div>
                <br />
                <div className="form-group">
                    <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <br />
                <div className="form-group">
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <br />
                <div className="form-group">
                    <div className="col-12">
                        <ul className="actions">
                            <li> {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        <input type="submit" value="Register" className="primary" /></li>
                            <li><input type="button" onClick={redirectLogin} value="Login Instead" /></li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };