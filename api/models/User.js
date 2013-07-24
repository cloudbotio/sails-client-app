/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	attributes: {

		name: {

			type: "string",
			required: true
		},

		email: {

			type: "email",
			required: true
		},

		password: {

			type: "string",
			minLength: 8,
			required: true
		},
		
		access_token: {

			type: "string",
			minLength: 8,
			required: true
		},

		toJSON: function() {

			var obj = this.toObject();

			delete obj.password;
			delete obj.access_token;

			return obj;
		}
	},

	auth: function(email, password, callback) {

		callback = callback || function(){};

		User.findOne({email: email, password: password}, 
			function(err, user){

				if(err || !user)
					callback(false);

				else
					callback(user.toJSON());
		});
	},
};
