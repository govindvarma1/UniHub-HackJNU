import React, { useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';
import { CheckLogin } from '../../Utils/CheckLogin';
import {useNavigate} from "react-router-dom";
const Header = () => {

  const navigate = useNavigate();

  const {isLoggedIn, login, logout} = useAuth();
  useEffect(() => {
    async function VerifyLogin() {
      const response = await CheckLogin();
      if(response === true) {
        login();
      } 
      console.log(response);
    }
    VerifyLogin();
  }, [])

  return (
    <header className="fixed top-0 z-10 w-full p-4 text-white bg-blue-500">
      <div className="container flex justify-between mx-auto">
        <h1 className='text-2xl font-semibold'><NavLink to="/">UniHub</NavLink></h1>
          <ul className='flex gap-8'>
            <li className="font-semibold text-md"><NavLink to="/">Home</NavLink></li>
            <li className="font-semibold text-md"><NavLink to="/universities">Universities</NavLink></li>
            <li className="font-semibold text-md"><NavLink to="/projects">Projects</NavLink></li>
            <li className="font-semibold cursor-pointer text-md">{isLoggedIn? <p onClick={() => {logout()}}>Logout</p>: <NavLink to="/login">Login</NavLink>}</li>
          </ul>
      </div>
    </header>
  );
};

export default Header;

