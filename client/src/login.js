import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import loginCSS from './login_registration.module.css';
import logo from './assets/sesh_white.png';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [passwordType, setPasswordType] = useState('password')
    const [toggle, setToggle] = useState('SHOW')
    const [loginStatus, setLoginStatus] = useState('');

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true
    const login = () => {
        Axios.post('http://localhost:7000/login', {
        username: username, 
        password: password
        }).then((response) => {
            if(response.data.admin){
                navigate('/admin')
            }else{
                if(response.data.message){
                    setLoginStatus(response.data.message);
                }else{
                    navigate("/home")
                    setLoginStatus("Welcome "+response.data[0].u_name);
                }
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    const togglePasswordType = () => {
        if(passwordType === 'password'){
            setPasswordType('text')
            setToggle('HIDE')
            return;
        }
        setPasswordType('password')
        setToggle('SHOW')
    }

    useEffect(() => {
        Axios.get('http://localhost:7000/login').then((response) => {
            if(response.data.loggedIn == "yes"){
                setLoginStatus(response.data.user[0].u_name)
            }
        }).catch(err =>{
            console.log(err)
        })
    }, [])

    return (
        <div className={loginCSS.card}>
           <h1 className={loginCSS.brand}><img src={logo} />SESH</h1>
           <h2>LOGIN</h2>
            <input type="text" placeholder="Username" name="username" onChange={(e)=>{
                setUsername(e.target.value);
            }}/>
            <br />
            <input type={passwordType} placeholder="Password" name="password" onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            <button className={loginCSS.toggle} onClick={togglePasswordType}>{toggle}</button>
            <br />
            <button onClick={login}>LOGIN</button>
           <p>Don't have an account? <a href='/register'>Register</a></p>

            <h2>{loginStatus}</h2>

        </div>
    )
}

export default Login;