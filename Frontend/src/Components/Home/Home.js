import React from 'react';
import './Home.css'; // Import your CSS file for styling
import Sidebar from '../Sidebar/Sidebar';

const Home = () => {
  return (
    <div>
    <Sidebar Title='Home'/>
    <div className="home_container">
       
      Welcome Admin Panel
    </div>
    </div>
  );
};

export default Home;
