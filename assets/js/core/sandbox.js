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

	var init = function() {

		return exports;
	}

	return init();	
};

var sandbox = new Sandbox(core);