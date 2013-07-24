/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

 	// User is allowed, proceed to controller
	if (req.session.logged_in || req.session.authenticated) {
		return ok();
	}

	// User is not allowed
 	else {
		
		if(!req.param("email") || !req.param("password")) {

			Response.create({

					code: 403,
					result: "error",
					message: "email and/or password not defined",
					timestamp: Date.now()

			}).done(function(err, response) {

				if(err)
						res.json(err);
					else 
						res.json(response.serializeData());
			});
		}

		else {

			User.auth(req.param("email"), req.param("password"),
				function(response){

					if(response) {

						req.session.user = response;
						ok();
					}

					else {

						Response.create({

							code: 403,
							result: "error",
							message: "email and/or password incorrect",
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