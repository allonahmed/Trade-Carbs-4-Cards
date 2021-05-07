import React from 'react'
import './Login.css'

const LoginPage = () => {
    return (
        <div className="form-homepage">
            <div className="form-container">
                <h1 className="form-header">Sign Into Carbs4Cards</h1>
                <form id="login-form">

                    <div className="form-field">
                        <label for="emailfield">Email</label>
                        <input id="emailfield" type="text" name="email" placeholder="johndoe@example.com" required />
                    </div>

                    <div className="form-field">
                        <label for="passwordfield">Password</label>
                        <input id="passwordfield" type="password" name="password" placeholder="********" required />
                    </div>
                    
                    <div className="form-field">
                        <input type="submit" value="Log In" />
                        <a href="./signup" target="_self" id="signup-link">Sign up here!</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;