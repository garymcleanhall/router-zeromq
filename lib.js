(function() {

	var express = require('express'),
		router = express.Router(),
		responseTime = require('reponse-time'),
		zmq = require('zmq'),
		socket = zmq.socket('pub');

	socket.bindSync('tcp://127.0.0.1:3000');

	router.use(responseTime());

	function publishResponse(response) {
		socket.send(response);
	}

	router.use(function(request, response, next) {

		response.on('finish', function() { publishResponse(response) });
		
		socket.send(request);

		next();
	});

	module.exports = router;

})();