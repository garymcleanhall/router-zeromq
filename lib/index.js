var zmq = require('zmq'),
	socket = zmq.socket('pub');

module.exports = function(options) {

	options = options || {};

	var address = options.address || 'tcp://localhost:2765';
	var protocol = options.protocol;
	var host = options.host;
	var port = options.port;

	address = address || protocol + '://' + host + ':' + port; 

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