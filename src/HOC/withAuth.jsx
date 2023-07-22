import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries';

import Login from '../pages/Auth/login';

const withAuth = conditionFunc => Component => props => {
    return (
        <Query query={GET_CURRENT_USER}>

            {({ data, loading, error, refetch }) => {
                if (loading) return null

                if (typeof document !== 'undefined') {

                    const tokenExpired = localStorage.getItem('token');

                    if (tokenExpired === undefined) return <Login {...props} refetch={refetch} />
                    
                }

                if (data.getCurrentUser === null) return <Login {...props} refetch={refetch} />
                
                return conditionFunc(data) ? <Component {...props} /> : <Redirect to="/login" />
            }}


        </Query>

    )

};

export default withAuth;