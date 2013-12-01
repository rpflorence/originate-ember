var msg = require('loom/lib/message');
var glob = require('glob');

exports.before = function(next, env) {
  if (!env.args[0]) {
    msg.error("please provide a project path, ie: 'generate ember my-app'");
  }
  next();
};

exports.present = function(next, env) {
  next({
    appName: env.args[0]
  })
};

exports.savePath = function(next, env, template) {
  next(env.args[0]+'/'+template.replace('.hbs', ''));
};

exports.templates = glob.sync(__dirname+'/../templates/**/*.hbs').map(function(template) {
  var base = __dirname.replace(/generators$/, '')+'templates/';
  return template.replace(base, '');
});

exports.after = function(next, env) {
  console.log('------------');
  msg.notify('all done!\nnow run\n  npm install\n  bower install\n  grunt\nin your new app to get started.')
  console.log('------------');
  next();
};

