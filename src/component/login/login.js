import React, { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import "./login.css";
import axios from "../../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const REGISTER_URL = '/auth/login';

const Login = () => {
    const { auth, setAuth } = useAuth();
    const usernameRef = useRef(); // to set focus on the username input

    const [username, setUsername] = useState('');
    const [pwdtext, setPwdtext] = useState('');
    const [errMsgtext, setErrMsgtext] = useState('');
    const [successtext, setSuccesstext] = useState(false); // To show or not a suceess Msg

    // Get the path of the protected route that the user tried to access without connecting, 
    // So when he connect we will redirect him to this page
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

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

            console.log("console", auth.roles)
            setUsername('')
            setPwdtext('')
            setSuccesstext(true);

            // Replace means that the login path history will be replaced with contact, 
            // so user can't retunr back to the login page after connecting
            navigate(from, { replace: true });
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