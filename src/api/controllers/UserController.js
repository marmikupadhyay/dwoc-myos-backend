const User = require('../../models/User');
const Sheet = require('../../models/Sheet');
const SheetItem = require('../../models/SheetItem');

const UserController = {
	getUserDetails(req, res, next) {
		const userId = req.params.id; //replace with req.user._id once auth is done
		User.find({ _id: userId })
			.populate('sheets')
			.then((user) => {
				res.status(200).json({
					message: 'User Details Fetched Succesfully',
					data: user,
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: 'Internal Server Error',
					data: {},
				});
			});
	},
};

module.exports = UserController;
