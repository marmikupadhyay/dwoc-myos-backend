const mongoose = require('mongoose');

const InputControllerSchema = new mongoose.Schema({
	parentCategory: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	propertyName: {
		type: String,
		required: true,
	},
	propertyType: {
		type: String,
		required: true,
	},
	dropdownItems: [String],
	units: [String],
});

const InputController = mongoose.model(
	'InputController',
	InputControllerSchema
);
module.exports = InputController;
