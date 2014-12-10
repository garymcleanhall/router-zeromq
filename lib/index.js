var express = require('express'),
	router = express.Router(),
	zmq = require('zmq'),
	socket = zmq.socket('pub');

socket.bindSync('tcp://127.0.0.1:3000');

function publishResponse(response) {
	console.log('publishing response...');
	socket.send(['responses', JSON.stringify(response._headers)]);
	console.dir(response._headers);
}

router.use(function(request, response, next) {

	response.on('finish', function() { publishResponse(response) });
	
	console.log('publishing request...');
	socket.send(['requests', JSON.stringify(request.headers)]);
	console.dir(request.headers);

	next();
});

module.exports = router;