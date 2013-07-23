var Sandbox = function(core) {

	var exports = {};

	// room observer pattern
	exports.subscribe = core.broadcast.subscribe;
	exports.unsubscribe = core.broadcast.unsubscribe;
	exports.publish = core.broadcast.publish;

	// request methods
	function request(url, callback){

		return core.socket.get(url, callback);

	}; exports.request = request;

	// model webservice reflection
	function model(path, callback) {

		path = path || "";

		return sandbox.request("/" + path, callback);

	}; exports.model = model;

	var init = function() {

		return exports;
	}

	return init();	
};

var sandbox = new Sandbox(core);