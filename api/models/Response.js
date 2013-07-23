/**
 * Response
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	// TODO: implement Log adapter for this
	//adapter: 'sails-disk',

	attributes: {

		code: {

			type: "string",
			required: true
		},

		result: {

			type: "string",
			required: true
		},

		message: {

			type: "string",
		},

		timestamp: {

			type: "integer",
			required: true
		},

		set: function(o) {
			return create(o);
		},

		serializeData: function(data) {

			var obj = this.toObject();

			if(data)
				obj.data = data;

			delete obj.createdAt;
			delete obj.updatedAt;
			delete obj.id;
			
			return obj;
		}
	},

};
