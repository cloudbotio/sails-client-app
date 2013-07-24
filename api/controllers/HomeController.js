/*---------------------
	:: Home 
	-> controller
---------------------*/
var HomeController = {

	index: function(req, res) {

		//res.json({result: "error"});
		//return;

		res.view({
			title: 'Sails'
		});
	}

};
module.exports = HomeController;