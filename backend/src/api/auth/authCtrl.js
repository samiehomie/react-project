const Joi = require('joi');
const User = require('../../models/user');

exports.register = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    // TODO(frontend): status code 400에 대한 오류 메시지 처리
    ctx.status = 400;
    // TODO(frontend): ctx.body에 error 객체를 싣지 않으면 프론트의 catch 에서 에외처리 못하는지 확인
    // TODO(frontend): 같은 맥락으로, ctx.status 에 오류 관련 코드번호를 보내는 것만으로도 프론트에서 에러로 잡는지 확인
    // TODO: createRequestSag.js
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409;
      return;
    }

    const user = new User({ username });
    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    })
  } catch (error) {
    ctx.throw(500, error);
  }
};

exports.check = ctx => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

exports.logout = ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};