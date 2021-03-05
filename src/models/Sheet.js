const mongoose = require('mongoose');
const SheetItem = require('./SheetItem');

const SheetSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User' 
	},
	filename: {
		type: String,
		required: true,
	},
	isPublic: {
		type: Boolean,
		default: false,
	},
	sheetData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SheetItem' }],
});

const Sheet = mongoose.model('Sheet', SheetSchema);
module.exports = Sheet;
