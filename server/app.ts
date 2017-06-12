import * as Koa from "koa";
import * as session from "koa-session";
import * as bodyParser from "koa-bodyparser";
import "./auth";
import * as passport from "koa-passport";
import * as Router from "koa-router";
import * as graphqlHTTP from "koa-graphql";
import {schema} from './schema';

const koaApp = new Koa();
const router = new Router();
koaApp.keys = ['your-session-secret'];
koaApp.use(session({}, koaApp));
koaApp.use(bodyParser());
koaApp.use(passport.initialize());
koaApp.use(passport.session());

router.post('/login',
    function (ctx, next) {
        return passport.authenticate('local', function (err:any, user:any) {
            if (err || user === false) {
                ctx.body = {success: false};
                ctx.throw(401);
            } else {
                ctx.body = {success: true};
                return ctx.login(user);
            }
        })(ctx, next);
    }
);

router.post('/logout', function (ctx) {
    ctx.logout();
    ctx.redirect('/');
});

koaApp.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
});

router.all('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

koaApp.use(router.routes());
koaApp.listen(3001, () => {
    console.log('> Ready on http://localhost:3000')
});
