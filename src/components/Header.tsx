import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const onLogoutClick = () => {
        sessionStorage.removeItem('AUTHORITY');
        navigate('/login');
      }
  return (
    <div>Header<button onClick={onLogoutClick}>ログアウト</button></div>
  )
}

export default Header