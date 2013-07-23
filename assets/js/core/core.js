var Core = function(options) {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var exports = {options: options};

	function config() {

		return  {

			State: {

				Development: {

					level: 0,
					text: "development"
				},

				Testing: {

					level: 1,
					text: "testing"
				},

				Production: {

					level: 2,
					text: "production"
				},
			},

			LogLevel: {

				Fatal: {

					value: 0,
					text: "FATAL ERROR"
				},

				Error: {

					value: 1,
					text: "ERROR"
				},

				Test: {

					value: 2,
					text: "TEST"
				},

				Debug: {

					value: 3,
					text: "DEBUG"
				},

				Info: {

					value: 4,
					text: "Info"
				},
			}
		}
	}; window.Config = config();

	exports.socket = window.io.connect();

	var Lib = function(d) {

		if ( arguments.callee._singletonInstance )
			return arguments.callee._singletonInstance;
		arguments.callee._singletonInstance = this;

		var exports = {};

		for(var i = 0; i < d.length; i++) {

			exports[d[i][0]] = window[d[i][1]];

			window[d[i][1]] = null
			delete window[d[i][1]];
		}

		return exports;

	}; exports.lib = new Lib(options.dependencies);

	var Logger = function() {

		if ( arguments.callee._singletonInstance )
			return arguments.callee._singletonInstance;
		arguments.callee._singletonInstance = this;

		var exports = {};

		exports.fatal = function(msg, context, arg) {

			return push(msg, Config.LogLevel.Fatal, context, arg);
		}

		exports.error = function(msg, context, arg) {

			return push(msg, Config.LogLevel.Fatal, context, arg);
		}

		exports.test = function(msg, context, arg) {

			return push(msg, Config.LogLevel.Fatal, context, arg);
		}

		exports.debug = function(msg, context, arg) {

			return push(msg, Config.LogLevel.Fatal, context, arg);
		}

		exports.info = function(msg, context, arg) {

			return push(msg, Config.LogLevel.Fatal, context, arg);
		}

		function push(msg, level, context, arg) {

			context = context || "application";

			var head = context.toLowerCase() + ": (";
				head += level.text.toLowerCase() + ") ";

			console.log(head + msg);

			if(arg)
				console.log(arg);

		}; exports.push = push;

		function init() {

			return exports;
		}

		return init();

	}; exports.log = new Logger();

	var Broadcast = function() {

		if ( arguments.callee._singletonInstance )
			return arguments.callee._singletonInstance;
		arguments.callee._singletonInstance = this;

		var exports = {};

		var subscribers = {
			any: [] 
		};
		
		function subscribe(type, fn) {

			type = type || 'any';

			if (typeof subscribers[type] === "undefined")
				subscribers[type] = [];

			subscribers[type].push(fn);

		}; exports.subscribe = subscribe;

		function unsubscribe(fn, type) {

			visitSubscribers('unsubscribe', fn, type);

		}; exports.unsubscribe = unsubscribe;

		function publish(type, publication) {

			visitSubscribers('publish', publication, type);

		}; exports.publish = publish;

		function visitSubscribers(action, arg, type) {

			core.log.info(type, "Broadcast", arg);

			var pubtype = type || 'any';
			var s = subscribers[pubtype];
			var	i;
			var max = s.length;

			for (i = 0; i < max; i += 1) {

				if (action === 'publish') {

					s[i](arg);
				} 

				else {

					if (s[i] === arg)
						s.splice(i, 1);
				}
			}
		}

		function init() {
			return exports;
		}

		return init();

	}; exports.broadcast = new Broadcast();

	var Modules = function() {

		var moduleData = {};

		return {

			include: function(name, callback) {

				core.lib.jQuery.getScript("js/modules/" + name + ".js",

				function(){

					callback(name, window[name+"_module"]);

				});
			},

			register: function (moduleId, creator) {

				moduleData[moduleId] = {
					creator: creator,
					instance: null
				};
			},

			start: function (moduleId) {

				moduleData[moduleId].instance = 
				moduleData[moduleId].creator(sandbox);
				moduleData[moduleId].instance.init();
			},

			stop: function (moduleId) {

				var data = moduleData[moduleId];

				if (data.instance) {
					data.instance.destroy();
					data.instance = null;
				}
			}
		}

	}; exports.modules = new Modules();

	function init() {

		return exports;
	}

	return init();	
};

var core = new Core({

	host: 'http://localhost:1337',

	dependencies: [	
		["jQuery", "$"],
		["angular", "angular"]
	],

	modules: [
		"user"
	]
});

