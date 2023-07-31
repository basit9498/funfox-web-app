import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Groups from '../pages/Groups';
import Signup from '../pages/Signup';
import PrivateRoute from './PrivateRoute';
import Protected from './Protected';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';

const Index = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route exact path="/group" element={<PrivateRoute />}>
            <Route exact path="/group" element={<Groups />} />
          </Route> */}
          <Route
            path="/group"
            element={
              <PrivateRoute>
                <Groups />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Index;
