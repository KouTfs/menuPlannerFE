import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const authCheckUrl = 'http://localhost:5000/menus'

    const checkToken = async () => {
        const token = sessionStorage.getItem('AUTHORITY');
        if(token == null){
            navigate('/login')
        }else{
            axios.get(authCheckUrl, {
                headers: {Authorization: token}
            }).then(()=>navigate('/app')).catch(()=>{navigate('/login')})
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