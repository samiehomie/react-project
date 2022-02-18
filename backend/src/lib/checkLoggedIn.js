const checkLoggedIn = (ctx, next) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401; // Unauthorized
    return;
  }
  return next();
};

module.exports = checkLoggedIn;