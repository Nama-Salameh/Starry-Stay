import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path : string) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div>
      <div className="sidebar">
        <button onClick={() => handleNavigation('cities')}>Cities</button>
        <button onClick={() => handleNavigation('hotels')}>Hotels</button>
        <button onClick={() => handleNavigation('rooms')}>Rooms</button>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
