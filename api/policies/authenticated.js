/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

	// User is allowed, proceed to controller
	if (req.session.authenticated || req.session.logged_in) {
    	return ok();
	}

	// User is not allowed
	else {

		if(!req.param("access_token")) {

			Response.create({

				code: 403,
				result: "error",
				message: "no access_token provided",
				timestamp: Date.now()

			}).done(function(err, response) {

				if(err)
						res.json(err);
					else 
						res.json(response.serializeData());
			});
		}

		else {

			User.findOne({access_token: req.param("access_token")}, 
				function(err, user) {
					if(!err)
						return ok();
					else {

						Response.create({

							code: 403,
							result: "error",
							message: "no access_token provided",
							timestamp: Date.now()

						}).done(function(err, response) {

							if(err)
									res.json(err);
								else 
									res.json(response.serializeData());
						});
					}
			});
		}
	}
};