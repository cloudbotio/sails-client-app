/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

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

				if(!err && user) {

					req.session.authenticated = true;
					req.session.user = user;
					return ok();
				}

				else {

					Response.create({

						code: 403,
						result: "error",
						message: "invalid or unknown access_token",
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
};