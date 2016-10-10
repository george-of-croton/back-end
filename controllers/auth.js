Var User = require('../models/user')

module.exports = {
		register: function(req, res){
		console.log(req.body);

		var user = new User(req.body);

		user.save(function(err, result) {
			if (err) {
				res.status(500).send ({
					message: err.message
				});
			}
			res.status(200);
		})
	}
}