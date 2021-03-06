var jade = require('jade');
var sysPath = require('path');

describe('Plugin', function() {
  var plugin;

  beforeEach(function() {
    plugin = new Plugin({});
  });

  it('should be an object', function() {
    expect(plugin).to.be.ok;
  });

  it('should has #compile method', function() {
    expect(plugin.compile).to.be.an.instanceof(Function);
  });

  it('should compile and produce valid result', function(done) {
    var content = '!!! 5';
    var expected = '<!DOCTYPE html>';

    plugin.compile(content, 'template.jade', function(error, data) {
      expect(error).not.to.be.ok;
      expect(eval(data)()).to.equal(expected);
      done();
    });
  });


  describe('getDependencies', function() {
    it('should output valid deps', function(done) {
      var content = "\
include valid1\n\
include valid1.jade\n\
include ../../test/valid1\n\
include ../../test/valid1.jade\n\
extends valid2\n\
extends valid2.jade\n\
include ../../test/valid2\n\
include ../../test/valid2.jade\n\
";

      var expected = [
        sysPath.join('valid1.jade'),
        sysPath.join('valid1.jade'),
        sysPath.join('..', '..', 'test', 'valid1.jade'),
        sysPath.join('..', '..', 'test', 'valid1.jade'),
        sysPath.join('valid2.jade'),
        sysPath.join('valid2.jade'),
        sysPath.join('..', '..', 'test', 'valid2.jade'),
        sysPath.join('..', '..', 'test', 'valid2.jade')
      ];

      plugin.getDependencies(content, 'template.jade', function(error, dependencies) {
        expect(error).not.to.be.ok;
        expect(dependencies).to.eql(expected);
        done();
      });
    });
  });
});
