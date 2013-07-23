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

		birthDate: 'DATE'
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

	toJSON: function() {

		var obj = this.toObject();

		delete obj.password;

		return obj;
	}

};
