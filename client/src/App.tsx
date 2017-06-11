import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';
import {Layout} from 'antd';
import {LoginPage} from './pages/LoginPage';
import {Main} from './pages/Main';
import 'antd/dist/antd.css';
import './App.css';
import {isAuthenticated} from './services/Auth';

interface PrivateRoute {
    component: React.ComponentClass<{ location?: string }> | React.SFC<{}>;
    path: string;
}

const PrivateRoute = ({component: Component, path}: PrivateRoute) => (
    <Route path={path} render={(props: { location: string }) => {
        return (
            isAuthenticated() ? (
                <Component />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location},
                }} />
            )
        );
    }} />
);

const Protected = () => <h3>Protected</h3>;

const App = () => (
    <Router>
        <Layout>
            <PrivateRoute path="/" component={Main} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/protected" component={Protected} />
        </Layout>
    </Router>
);

export default App;
