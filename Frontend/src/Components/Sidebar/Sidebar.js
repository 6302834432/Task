import React from 'react';
import './Sidebar.css'; 

const Sidebar = ({Title}) => {
  return (
    <div className="sidebar">
      <div className="dashboard">{Title}</div>
    </div>
  );
};

export default Sidebar;
