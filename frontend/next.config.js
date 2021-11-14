const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    env: {
    FLASK_HOST: 'http://127.0.0.1:5000/',
  },
});
