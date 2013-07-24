var user_module = function(sandbox) {

	var exports = {};

	function login(data) {

		sandbox.request("/User/login", data, 
			function(response) {

				if(response.result == "error") {

					sandbox.publish("user/login/error", response);
				}
		});

	}; sandbox.subscribe("user/login", login);

	function init() {

		core.log.debug("initializing user management module...", "user");

		return exports;
	};

	return init();
};