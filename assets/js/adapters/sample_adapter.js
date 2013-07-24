var sample_adapter = function(options) {

	var exports = {};

	function getOptions() {

		return options;

	}; exports.getOptions = getOptions;

	function init() {

		core.log.info("sample adapter initialized", "sample adapter");
		return exports;
	}

	return init();
		
};