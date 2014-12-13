var zmq = require('zmq'),
	socket = zmq.socket('pub');

module.exports = function(options) {

	options = options || {};

	var protocol =  options.protocol || 'tcp';
	var host = options.host || 'localhost';
	var port = options.port || 2765;

	address = protocol + '://' + host + ':' + port;
	socket.bindSync(address);

	function publishResponse(response) {
		socket.send(['responses', JSON.stringify(response._headers)]);
	}

	return function zmqRouter(request, response, next) {
		response.on('finish', function() { publishResponse(response); });
		socket.send(['requests', JSON.stringify(request.headers)]);
		next();
	};
};