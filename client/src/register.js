import React,{useState} from 'react';
import Axios from 'axios';
import registrationCSS from './login_registration.module.css';
import logo from './assets/sesh_white.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Register(){
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [passwordType, setPasswordType] = useState('password')
const [registerStatus, setRegisterStatus] = useState('')
const [toggle, setToggle] = useState('SHOW')

const register = () => {
    Axios.post('http://localhost:7000/register', {
        username: username, 
        email: email, 
        password: password
    }).then((response) => {
        console.log(response);
        if(response.data.message){
            setRegisterStatus(response.data.message);
        }else{
            setRegisterStatus("Account Create Successfully! Proceed to LOGIN");
        }
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

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Length: 8 characters<br/>Must Include: Atleast 1 capital letter, 1 small letter, 1 digit and 1 *
    </Tooltip>
  );

    return (
        <div className={registrationCSS.regCard}>
           <h1 className={registrationCSS.brand}><img src={logo} />SESH</h1>
           <h2>REGISTER</h2>
            <input type="text" placeholder='Username' name="username" onChange={(e)=>{
                setUsername(e.target.value);
            }} />
            <br />
            <input type="text" placeholder='Email' name="email" onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            <br />
            <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }}  overlay={renderTooltip} >
                <input type={passwordType} placeholder='Password' name="password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
            </OverlayTrigger>
            <button className = {registrationCSS.toggle} onClick={togglePasswordType}>{toggle}</button>
            {/* <span>Length: 8 characters, Must Include: Atleast 1 capital letter, 1 small letter, 1 digit and *</span> */}
            <br />
            <button onClick={register}>REGISTER</button>
           <p>Already have an account? <a href='/'>Login</a></p>
           <h2>{registerStatus}</h2>
        </div>
    )
}

export default Register;