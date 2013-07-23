var Core = function(options) {

	var exports = {};

	exports.socket = window.io.connect();

	function Broadcast() {

		if ( arguments.callee._singletonInstance )
    		return arguments.callee._singletonInstance;
  		arguments.callee._singletonInstance = this;

		var exports = {};

		var subscribers = {
			any: [] // event type: subscribers
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

	host: 'http://localhost:1337'
});

