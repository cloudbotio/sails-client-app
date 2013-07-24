/*---------------------
	:: Home 
	-> controller
---------------------*/
var HomeController = {

	index: function(req, res) {
		res.view({
            home: [{title: 'Sails'}]
        });
	}

};
module.exports = HomeController;