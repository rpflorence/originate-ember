var generator = require('../loom/generators/ember');
var msg = require('loom/lib/message');
var sinon = require('sinon');

describe('component generator', function() {
  describe('before', function() {
    it('validates a project path was provided', function(done) {
      var mock = sinon.mock(msg);
      mock.expects('error').once();
      var env = { args: [] };
      generator.before(function() {
        mock.verify();
        mock.restore();
        done();
      }, env);
    });
  });

  describe('present', function() {
    it('sets appName', function(done) {
      var env = { args: ['my-app'] };
      generator.present(function(locals) {
        locals.should.eql({
          appName: 'my-app'
        });
        done();
      }, env);
    });
  });

  describe('savePath', function() {
    it('sets the correct savePath', function(done) {
      var env = { args: ['my-app'] };
      generator.savePath(function(path) {
        path.should.equal('my-app/tasks/whatever.js');
        done();
      }, env, 'tasks/whatever.js.hbs');
    });
  });

  describe('templates', function() {
    it('finds the right templates', function() {
      // I would check all of them, but the point of the code there is to not
      // have to update anything when we want to include a new file, right?
      generator.templates.should.include('package.json.hbs');
    });
  });
});

