import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser); // Set the user from localStorage
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null); // Update the state to trigger re-render
  };

  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div className='header-menu'>
        <div className='header-home'>
          <Link to='/'><div>Home</div></Link> 
          <div><Link to='/employeelist' >Employee List</Link></div>
        </div>
        <div className='header-content'>
          {user ? (
            <div>
              <span >{user.name}</span>
              <span onClick={logout} className='logout'>Logout</span>
            </div>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
