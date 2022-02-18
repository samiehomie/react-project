require('dotenv').config();
const mongoose = require('mongoose');
const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');
const bodyParser = require('koa-bodyparser');
const jwtMiddleware = require('./lib/jwtMiddleware');
// const createFakeData = require('./createFakeData');

const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to db:', MONGO_URI);
    // createFakeData();
  })
  .catch(error => console.error(error));

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => console.log('Connected to server:', port));