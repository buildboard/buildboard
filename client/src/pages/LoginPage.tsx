import * as React from 'react';
import {login} from '../services/Auth';
import {Login} from '../components/Login';
import {
    withRouter,
} from 'react-router-dom';

export const LoginPage = withRouter(({history}) => <Login history={history} login={login}/>);
