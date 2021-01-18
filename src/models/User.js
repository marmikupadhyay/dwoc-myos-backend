const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	sheets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sheet' }],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
