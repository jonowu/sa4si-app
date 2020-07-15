module.exports = {
  hooks: {
    'commit-msg': 'npx commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'npx lint-staged',
  },
};
