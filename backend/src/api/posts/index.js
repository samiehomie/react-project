const Router = require('koa-router');
const postCtrl = require('./postsCtrl');
const checkLoggedIn = require('../../lib/checkLoggedIn');

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/write', checkLoggedIn, postCtrl.write);

const post = new Router();
post.get('/', postCtrl.read);
post.delete('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);
post.patch('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update);

posts.use('/:id', postCtrl.getPostById, post.routes());

module.exports = posts;