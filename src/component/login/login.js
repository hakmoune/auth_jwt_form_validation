import React, { useEffect, useState, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login.css";
import axios from "../../api/axios";


const REGISTER_URL = '/auth/login';

const Login = () => {
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
            if (response.status === 200) {
                /* Redirection */
                console.log(response.data);
                setSuccesstext(true);
            }
        } catch (error) {
            console.error("Faild to connect", error.message);
        }
    }

    return (
        <section>
            {successtext ? (
                <div>
                    <h1>You are logged in!</h1>
                    <p><a href="#">Go to home !</a></p>
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