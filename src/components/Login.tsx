import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import APICommunicator from './APICommunicator';

export const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const communicator = new APICommunicator;

    const onClickLogin = async () => {
      if(userName && password){
        communicator.login({
          userName,
          password
       }).then((response)=>{
          sessionStorage.setItem('AUTHORITY', response.data);
          sessionStorage.setItem('USERNAME', userName);
          navigate('/app')
        }).catch((error) => {navigate("/fail_login")});
      }
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