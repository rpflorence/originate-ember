require('shelljs');

module.exports = function() {
  exec('bower install');
  exec('npm install');
  exec('grunt build');
};

