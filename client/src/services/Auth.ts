import * as fetch from 'isomorphic-fetch';

let authenticated = false;

export function isAuthenticated() {
    return authenticated;
}

export function login(username: string, password: string): Promise<{ success: boolean }> {
    const getJsonHeaders = {
        Accept: `application/json`,
    };

    const postJsonHeaders = {
        ...getJsonHeaders,
        'Content-Type': `application/json`,
    };
    return fetch('/login', {method: 'POST', headers: postJsonHeaders, body: JSON.stringify({username, password})})
        .then(function (res: {status: number}) {
            if (res.status !== 200) {
                return Promise.reject('fail');
            }
            authenticated = true;
            return Promise.resolve({success: true});
        })
        .catch(function () {
            return {success: false};
        });
}
