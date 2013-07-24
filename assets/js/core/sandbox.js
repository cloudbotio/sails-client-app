var Sandbox = function(core) {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var exports = {};

	// room observer pattern
	exports.subscribe = core.broadcast.subscribe;
	exports.unsubscribe = core.broadcast.unsubscribe;
	exports.publish = core.broadcast.publish;

	// request methods
	function request(url, params, callback){

		if(params && params.authenticated) {
			params.access_token = core.options.access_token;
			delete params.authenticated;
		}

		return core.socket.get(url, params, callback);

	}; exports.request = request;

	// model webservice reflection
	function model(path, callback) {

		path = path || "";
		callback = callback || function(){};

		return sandbox.request("/" + path, callback);

	}; exports.model = model;

	function Adapter() {

		var exports = {};
		var adaptersData = {};

		function register(name, options, callback) {

			include(name, options, function(adapter){

				sandbox.adapter[name] = new adapter(options);

				callback = callback || function(){};
				callback();
			});

		}; exports.register = register;

		function include(name, options, callback) {

			name = name || "";
			callback = callback || function(){};
			
			core.lib.jQuery.getScript("js/adapters/" + name + "_adapter.js",
			function(){

				callback(window[name+"_adapter"]);

			});

		};

		function init() {
			return exports;
		}

		return init();

	} exports.adapter = new Adapter();

	var init = function() {

		if(window.sandbox || sandbox)
			return window.sandbox || sandbox;

		var m = core.options.modules;

		for(var i = 0; i < m.length; i++) {

			core.modules.include(m[i], function(name, module){

				core.modules.register(name, module);
				core.modules.start(name);
			});
		}

		return exports;
	}

	return init();	
};

var sandbox = window.sandbox = new Sandbox(core);