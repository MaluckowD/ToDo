import React from 'react';
import { Route, useLocation } from 'react-router-dom';

const createCaseSensitiveRoute = (path, element) => {
  return function CaseSensitiveRoute(props) {
    const location = useLocation();
    if (location.pathname === path) {
      return <Route {...props} element={element} />;
    }
    return null;
  };
};

export default createCaseSensitiveRoute;