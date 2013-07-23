var Core = function(options) {

	var exports = {};

	function config() {

		return  {

			State: {

				Development: {

					level: 0,
					text: "development"
				},

				Testing: {

					level: 0,
					text: "testing"
				},

				Production: {

					level: 0,
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

				Debug: {

					value: 0,
					text: "DEBUG"
				},

				Test: {

					value: 0,
					text: "TEST"
				},

				Info: {

					value: 0,
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

		exports.fatal = function(msg, context) {

			return push(msg, Config.LogLevel.Fatal, context);
		}

		function push(msg, level, context) {

			context = context || "application";

			var head = context.toLowerCase() + ": (";
				head += level.text.toLowerCase() + ") ";

			return console.log(head + msg);

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
	]
});

