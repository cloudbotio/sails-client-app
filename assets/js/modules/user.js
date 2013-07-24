var user_module = function(sandbox) {

	var exports = {};

	function login(data) {

		data = data || {};

		var params = {
			email: data.email || "",
			password: data.password || "",
			authenticated: true
		};

		sandbox.request("/User/me", params, 
			function(response) {

				if(response.result == "error") 
					sandbox.publish("user/login/error", response);
				
				else {

					core.log.debug("Welcome, " + response.data.name+".", "User");
					sandbox.publish("user/login/success", response.data);
				}
		});

	}; sandbox.subscribe("user/login", login);

	function init() {

		core.log.debug("initializing user management module...", "user");

		return exports;
	};

	return init();
};