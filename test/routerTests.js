
var rewire = require('rewire');
var RouterZeroMQ = rewire('../lib/index');
var assert = require('assert');
var should = require('should');

describe('ZeroMQ Router', function() {
	describe('options', function() {
		
    it('should default address to localhost via tcp on port 2765', function() {
			assertZmqSocketBindSync(function(address) {
				address.should.equal('tcp://localhost:2765');
			});
      RouterZeroMQ();
		});

    it('should allow protocol to be overridden', function() {
      assertZmqSocketBindSync(function(address) {
        address.should.equal('pgm://localhost:2765');
      });
      RouterZeroMQ({ protocol: 'pgm' });
    });

    it('should allow host to be overridden', function() {
      assertZmqSocketBindSync(function(address) {
        address.should.equal('tcp://this-is-an-override:2765');
      });
      RouterZeroMQ({ host: 'this-is-an-override'});
    });

    it('should allow port to be overridden', function() {
      assertZmqSocketBindSync(function(address) {
        address.should.equal('tcp://localhost:9999');
      });
      RouterZeroMQ({ port: 9999 });
    });

		function assertZmqSocketBindSync(callback) {
      RouterZeroMQ.__set__(
				{
					socket: 
          {
						bindSync: callback,
            send: function() {}
					}	
				}
			);
		}
	});
});