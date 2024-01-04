import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import styles from "./login.module.css"

import axios from '../../api/axios';
const LOGIN_URL = '/userlogin';

const Login = () => {
    const { setAuth,auth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const Navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        // This code will run after the component has re-rendered
        console.log("auth", auth);
      }, [auth]); // Include 'auth' as a dependency to run the effect when 'auth' changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ id : user, password : pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log("resd",response);
            // const accessToken = response?.data?.accessToken;
            const roleids = response?.data?.roles;
            console.log("role",roleids)
            const token = response?.data?.token;
            // setAuth({ user, pwd, roles, token });
            setAuth({ user, pwd, roleids, token});
            console.log(user,"u")
            console.log(pwd,"p")
            console.log(roleids,"role")
            console.log(token,"token")
            // setUser('');
            // setPwd('');
            setSuccess(true);
            Navigate('/dashboard')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
                        <section className={styles.logincontainer}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            
        </>
    )
}

export default Login
