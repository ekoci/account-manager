import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../auth/Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!localStorage.getItem('token') ?(
                    <RouteComponent {...routeProps}/>
                ) : (
                    <Redirect to={"/login"}/>
                )}
        />
    );
}

export default PrivateRoute;