import React from 'react';
import "../Login/Login.css"

const SignUpPage = () => {
    return (
        <div className="form-homepage">
            <div className="form-container">
                <h1 className="form-header">Sign Up For Carbs4Cards</h1>
                <form id="signup-form">

                    <p className="signup-p">
                        Sign up for Carbs4Cards and start working out today!
                    </p>

                    <div className="form-field">
                        <label for="emailfield">Email</label>
                        <input id="emailfield" type="text" name="email" placeholder="johndoe@example.com" required />
                    </div>

                    <div className="form-field">
                        <label for="fnamefield">First Name</label>
                        <input id="fnamefield" type="text" name="fname" placeholder="John" required />
                    </div>

                    <div className="form-field">
                        <label for="lnamefield">Last Name</label>
                        <input id="lnamefield" type="text" name="lname" placeholder="Doe" required />
                    </div>                

                    <div className="form-field">
                        <label for="passwordfield">Password</label>
                        <input id="passwordfield" type="password" name="password" placeholder="********" required />
                    </div>
                    
                    <div className="form-field">
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;