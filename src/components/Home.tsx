import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import APICommunicator from './APICommunicator';

const Home = () => {
    const navigate = useNavigate();
    const communicator = new APICommunicator;

    const checkToken = async () => {
        const token = sessionStorage.getItem('AUTHORITY');
        if(token == null){
            navigate('/login')
        }else{
            communicator.checkAuth(token).then(()=>navigate('/app')).catch(()=>{navigate('/login')});
        }
    }
  return (
    <>
        <div>Home</div>
        <button onClick={checkToken}>サービスへ</button>
    </>
  )
}

export default Home