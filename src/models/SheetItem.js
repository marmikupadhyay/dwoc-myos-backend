const mongoose = require('mongoose');

const SheetItemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	properties: mongoose.Schema.Types.Mixed,
});

const SheetItem = mongoose.model('SheetItem', SheetItemSchema);
module.exports = SheetItem;
