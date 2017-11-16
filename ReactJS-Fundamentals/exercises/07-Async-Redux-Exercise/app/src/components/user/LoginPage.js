import React from 'react';

let LoginPage = (props) => {
    return (
        <section id="viewLogin">
            <div className="content">
                <form id="formLogin" className="form">
                    <label>Username</label>
                    <input onChange={(e) => props.dataFunc(e)} name="username" type="text"/>
                    <label>Password</label>
                    <input onChange={(e) => props.dataFunc(e)} name="password" type="password"/>
                    <input id="btnLogin" value="Sign In" type="submit"/>

                    <br/>
                    <span className="auth-subinfo">Haven't joined yet?</span>
                    <button className="buttonChangeView" onClick={(e) => props.viewFunc(e)}>Register</button>
                </form>
            </div>
        </section>
    )
};

export default LoginPage