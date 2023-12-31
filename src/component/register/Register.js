import React, { useEffect, useState, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";
import axios from "../../api/axios";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = '/auth/login';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setMsgErr] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);

        const match = matchPwd === pwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setMsgErr('')
    }, [user, pwd, matchPwd]);

    /** CALL API */
    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setMsgErr('Invalid Entry');
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                //Axios automatically serializes the JavaScript object into JSON format, 
                //And sets the Content-Type header to application/json
                { username: user, password: pwd }

                /*JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }*/
            );
            /** Avec Axiox pas besoin de verifier le status si c'est OK ou no, automatiquement axios declench une erreur si il y en a */
            if (response.status === 200) {
                console.log(response.data);
                setSuccess(true);
            }

        } catch (err) {
            if (!err?.response) {
                setMsgErr('No Server Response...')
            }
            //else if selon les status code renvoyer par le back 409 = username taken 407.... etc
            else {
                setMsgErr('Registration Failed')
                console.error(`Failed to Connect. Status: ${err}`);
            }
            errRef.current.focus(); // Set the focus on the error for the screen reader
        }
    }

    return (
        <section>
            {success ? (
                <div>
                    <h1>Success!</h1>
                    <p><a href="#">Sign in</a></p>
                </div>
            ) : (
                <div>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username: <small>(atuny0)</small>
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? false : true}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a lettre.<br />
                            lettres, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password: <small>(9uQFF1Lh)</small>
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? false : true}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span>
                            <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? false : true}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button
                            disabled={!validName || !validPwd || !validMatch ? true : false}
                            className={!validName || !validPwd || !validMatch ? "disabled" : ''}
                        >
                            Sing Up
                        </button>
                    </form>

                    <p>
                        Already registered?
                        {/* This will be a react Router link */}
                        <a href="#" className="signIn">Sign in</a>
                    </p>
                </div>
            )}
        </section>
    )
}

export default Register;