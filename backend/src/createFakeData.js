const Post = require('./models/post');

module.exports = function createFakeData() {
  const posts = [...Array(50).keys()].map(index => ({
    title: `Post #${index + 1}`,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: [`fake_${index + 1}`, `data_${index + 1}`],
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}