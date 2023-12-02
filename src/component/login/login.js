import React, { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import "./login.css";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const REGISTER_URL = '/auth/login';

const Login = () => {
    const { setAuth } = useAuth();
    const usernameRef = useRef(); // to set focus on the username input

    const [username, setUsername] = useState('');
    const [pwdtext, setPwdtext] = useState('');
    const [errMsgtext, setErrMsgtext] = useState('');
    const [successtext, setSuccesstext] = useState(false); // To show or not a suceess Msg

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsgtext('');
    }, [username, pwdtext]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                { username: username, password: pwdtext }
            );

            const accessToken = response?.data.token
            const roles = 'admin' /* Renvoyer par le back, pour limiter ou donner l'access a certain route */
            setAuth({ username, pwdtext, roles, accessToken });

            setUsername('')
            setPwdtext('')
            setSuccesstext(true);
        } catch (error) {
            console.error("Faild to connect", error.message);
            setErrMsgtext("Faild to connect")
        }
    }

    return (
        <section>
            {successtext ? (
                <div>
                    <h1>You are logged in!</h1>
                    <p><Link to="/contact" >Go to contact !</Link></p>
                </div>
            ) : (
                <div>
                    <p className={errMsgtext ? "errmsg" : "offscreen"}>
                        {errMsgtext}
                    </p>

                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="usernametext">
                            Username: <small>(atuny0)</small>
                        </label>
                        <input
                            type="text"
                            id="usernametext"
                            ref={usernameRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            value={username}
                        />

                        <label htmlFor="passwordtext">
                            Password: <small>(9uQFF1Lh)</small>
                        </label>
                        <input
                            type="password"
                            id="passwordtext"
                            onChange={(e) => setPwdtext(e.target.value)}
                            value={pwdtext}
                            required
                        />

                        <button>
                            Sing In
                        </button>
                    </form>

                    <p>
                        Need an account?
                        {/* This will be a react Router link */}
                        <a href="#" className="signIn">Sign Up</a>
                    </p>
                </div>
            )}
        </section>
    )
}

export default Login;