import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

export const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();

    type User = {
        userName : string,
        password : string
    }

    const loginUrl = "http://localhost:5000/login"

    const onClickLogin = async () => {
         await axios.post(loginUrl, {
            userName,
            password
         }).then((response)=>{
          sessionStorage.setItem('AUTHORITY', response.data);
          navigate('/app')
        }).catch((error) => {navigate("/fail_login")});
    }
  return (
    <>
        <input className='userNameInput' type='text' value={userName} onChange={(e)=>{setUserName(e.target.value)}}></input>
        <input className='passwordInput' type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button onClick={onClickLogin}>Login</button>
    </>
  )
};

export default Login