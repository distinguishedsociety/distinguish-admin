import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuthenticated, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;