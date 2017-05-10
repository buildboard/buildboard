import * as React from 'react';
import {Component} from 'react';
import * as fetch from 'isomorphic-fetch';
interface State { username: string; password: string;
}
interface Input { target: { value: string };
}

class App extends Component<{}, State> {
    state = {
        username: 'test',
        password: 'test'
    };
    onChangeUsername = ({target: {value}}: Input) => {
        this.setState({username: value});
    }
    onChangePassword = ({target: {value}}: Input) => {
        this.setState({username: value});
    }
    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const getJsonHeaders = {
            Accept: `application/json`,
        };

        const postJsonHeaders = {
            ...getJsonHeaders,
            'Content-Type': `application/json`,
        };
        fetch('/login', {method: 'POST', headers: postJsonHeaders, body: JSON.stringify(this.state)})
            .then(function (e) {
                console.log(e);
            }).catch(console.log);
        e.preventDefault();
    };

    render() {
        return (
            <form action="/login" method="post" onSubmit={this.onSubmit}>
                <label htmlFor="username">Login:</label>
                <input type="text" id="username" value={this.state.username} onChange={this.onChangeUsername} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={this.state.password} onChange={this.onChangePassword} />
                <button type="submit">Log in</button>
            </form>
        );
    }
}

export default App;
