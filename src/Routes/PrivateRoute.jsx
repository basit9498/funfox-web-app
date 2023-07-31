// import React, { useState, useEffect } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useUserContext } from '../context/UserContext';

// const PrivateRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { user } = useUserContext();
//   useEffect(() => {
//     if (user) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();

  return user ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;
