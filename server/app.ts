import * as Koa from "koa";
import * as session from "koa-session";
import * as bodyParser from "koa-bodyparser";
import "./auth";
import * as passport from "koa-passport";
import * as Router from "koa-router";



const koaApp = new Koa();
const router = new Router();
koaApp.keys = ['your-session-secret'];
koaApp.use(session({}, koaApp));
koaApp.use(bodyParser());
koaApp.use(passport.initialize());
koaApp.use(passport.session());


router.post('/login',
    function (ctx, next) {
        console.log('dfs', ctx.request.body, ctx.request.query, ctx.request)
        return passport.authenticate('local', function (err:any, user:any) {
            console.log('dfs', err, user)
            //ctx.respond = false;
            if (user === false) {
                ctx.body = {success: false}
                ctx.throw(401)
            } else {
                ctx.body = {success: true}
                return ctx.login(user)
            }
        })(ctx, next)
    }
);

router.post('/logout', function (ctx) {
    ctx.logout();
    ctx.redirect('/');
});
/*router.get('/login', function(ctx) {
 ctx.body = '<form action="/login" method="post"><button>d</button><input type="text" value="test" name="username"><input type="password" name="password" value="test"></form>';
 });*/
router.get('/login', async (ctx) => {
    ctx.body = '<form action="/login" method="post"><button>d</button><input type="text" value="test" name="username"><input type="password" name="password" value="test"></form>';
});
/* router.get('/', function(ctx) {
 ctx.body = 'hello';
 });*/

/*router.get('/a', async ctx => {
 await nextApp.render(ctx.req, ctx.res, '/b', ctx.query);
 ctx.respond = false;
 });

 router.get('/b', async ctx => {
 await nextApp.render(ctx.req, ctx.res, '/a', ctx.query);
 ctx.respond = false;
 });*/

/*router.get('*', async ctx => {
    if (ctx.isAuthenticated()) {
        return next()
    } else {
        ctx.redirect('/login')
    }
});*/

/*router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
});*/

koaApp.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
});

koaApp.use(router.routes());
koaApp.listen(3001, () => {
    //if (err) throw err;
    console.log('> Ready on http://localhost:3000')
})
