import React from 'react'
import "../Login/Login.css"
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const SignUp = () => {
    const navigate = useNavigate()
    return (
        <div className="container-fluid login-container">
            <div className="login-form">
                <div className="login-box">
                    <h1 className="text-center">Welcome to <strong>GodongMenu</strong></h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="password">Username</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Email address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => navigate('/')}>SignUp</button>
                    </form>
                </div>
            </div>
            <div className="login-image" ></div>
        </div>
    )
}
export default SignUp;
