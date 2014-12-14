
var rewire = require('rewire');
var RouterZeroMQ = rewire('../lib/index');
var sinon = require('sinon');
var should = require('should');

describe('ZeroMQ Router', function() {
	describe('options', function() {
		
    it('should default address to localhost via tcp on port 2765', function() {
			fakeZmqSocket(function(address) {
				address.should.equal('tcp://localhost:2765');
			});
      RouterZeroMQ();
		});

    it('should allow protocol to be overridden', function() {
      fakeZmqSocket(function(address) {
        address.should.equal('pgm://localhost:2765');
      });
      RouterZeroMQ({ protocol: 'pgm' });
    });

    it('should allow host to be overridden', function() {
      fakeZmqSocket(function(address) {
        address.should.equal('tcp://this-is-an-override:2765');
      });
      RouterZeroMQ({ host: 'this-is-an-override'});
    });

    it('should allow port to be overridden', function() {
      fakeZmqSocket(function(address) {
        address.should.equal('tcp://localhost:9999');
      });
      RouterZeroMQ({ port: 9999 });
    });
  });
	
  describe('router function', function() {
    it('should register a handler to the response finish event', function() {

    });

    it('should send the request headers as json on the zmq socket', function() {

    });

    it('should signal that the next middleware can be called', function() {
       fakeZmqSocket();
       var requestSpy = sinon.spy();
       var responseSpy = { on: function() {} };
       var nextSpy = sinon.spy();
       var zmqRouter = RouterZeroMQ();
       zmqRouter(requestSpy, responseSpy, nextSpy);
       nextSpy.called.should.be.true;
    });
  });

  function fakeZmqSocket(bindSync, send) {
    RouterZeroMQ.__set__(
			{
				socket: 
        {
					bindSync: bindSync || function() {},
          send: send || function() {}
				}	
			}
		);
	}
});