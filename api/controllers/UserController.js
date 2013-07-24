/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	me: function(req, res) {

		User.find(req.session.user.id, function(err, user) {

			if(err)
				res.json({result:"unknown error"});

			else {

				Response.create({

					code: 200,
					result: "success",
					timestamp: Date.now()

				}).done(function(err, response) {

					if(err)
							res.json(err);
					else 
						res.json(response.serializeData(user[0]));
				});
			}
		});
	},

	signin: function() {
		res.send("calma la champs");
	}
};
