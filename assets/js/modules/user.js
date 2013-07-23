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

		core.log.test("ola", "user");

		return exports;

	}; exports.init = init;

	return init();
};