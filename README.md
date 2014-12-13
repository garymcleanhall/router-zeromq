[![Build Status](https://travis-ci.org/garymcleanhall/router-zeromq.svg?branch=master)](https://travis-ci.org/garymcleanhall/router-zeromq)

router-zeromq
=============

Express middleware for sending request and response data via &#x2205;mq.

## Installation

Use `npm` to install:

	$ npm install router-zeromq

## Examples

In the simplest case, just require `router-zeromq` and pass the router to express' `use` method: 

```js

var zmqRouter = require('router-zeromq');
var express = require('express');
var app = express();

app.use(zmqRouter);

app.get('/', function(request, response){
	response.send('Hello world!');
});

app.listen(5000);
console.log('Listening on port 5000...');

```

By default, the router uses 'straddle' mode which means that two separate messages are sent to &#x2205;: one for the `request` object and one for the `response` object. 

A `pub` socket type is created, unless overridden by supplied options.

You can partner this middleware with other middlewares and benefit from their additions and removals to the `request` and `response` objects. 

```js

var zmqRouter = require('router-zeromq');
var responseTime = require('reponse-time');
var express = require('express');
var app = express();

app.use(responseTime);
app.use(zmqRouter);

app.get('/', function(request, response){
	response.send('Hello world!');
});

app.listen(5000);
console.log('Listening on port 5000...');

```

As the example shows, ensure that you instruct your express app to use `router-zeromq` _after_ any other middleware.