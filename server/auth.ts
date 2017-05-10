import * as passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';

const fetchUser = (() => {
    // This is an example! Use password hashing in your
    const user = {id: 1, username: 'test', password: 'test'};
    return async function () {
        return user
    }
})();

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(async function (_, done) {
    try {
        const user = await fetchUser();
        done(null, user)
    } catch (err) {
        done(err, null);
    }
});

passport.use(new LocalStrategy(function (username, password, done) {
    fetchUser()
        .then(user => {
            if (username === user.username && password === user.password) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
        .catch(err => done(err))
}));