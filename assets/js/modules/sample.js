var sample_module = function(sandbox) {

	var exports = {};

	function loadSampleAdapter() {

		sandbox.adapter.register("sample");

		// register subscribe method
		// for calling it user 'sandbox.publish("load/adapter/sample");'
	};  sandbox.subscribe("load/adapter/sample", loadSampleAdapter);

	function init() {

		core.log.debug("initializing sample module...", "sample");
		return exports;
	};

	return init();
};