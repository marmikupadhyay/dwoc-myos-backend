const User = require('../../models/User');
const Sheet = require('../../models/Sheet');
const InputController = require('../../models/InputController');
const SheetItem = require('../../models/SheetItem');
const mongoose = require('mongoose');

const SheetController = {
	getInputControllers(req, res, next) {
		InputController.find({})
			.then((controllers) => {
				res.status(200).json({
					message: 'Controllers Fetched Successfully',
					data: controllers,
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
	getSheetDetails(req, res, next) {
		Sheet.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
			.populate('sheetData')
			.lean()
			.populate('author', 'username')
			.then((sheet) => {
				if (!sheet) {
					res.status(404).json({
						message: 'Sheet Not Found',
						data: {},
					});
				} else {
					res.status(200).json({
						message: 'Sheet Details Fetched Succesfully',
						data: sheet,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: 'Internal Server Error',
					data: {},
				});
			});
	},
	getAllSheets(req, res, next) {
		const userId = req.params.userId; //Change to req.user._id once we add the auth
		Sheet.find({ author: mongoose.Types.ObjectId(userId) })
			.populate('sheetData')
			.then((sheets) => {
				res.status(200).json({
					message: 'All Sheets Fetched',
					data: sheets,
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
	makeNewSheet(req, res, next) {
		let author = req.body.author; //Change to req.user._id once we add the auth
		let { filename, isPublic } = req.body;
		let sheetData = [];
		const newSheet = new Sheet({ author, filename, isPublic, sheetData });
		newSheet
			.save()
			.then((sheet) => {
				User.findOneAndUpdate(
					{ _id: mongoose.Types.ObjectId(sheet.author) },
					{ $push: { sheets: sheet._id } }
				)
					.then((user) => {
						res.status(200).json({
							message: 'New Sheet Created',
							data: sheet,
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							message: 'Internal Server Error',
							data: {},
						});
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
	deleteSheet(req, res, next) {
		Sheet.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.id) })
			.then((sheet) => {
				User.findOneAndUpdate(
					{ _id: sheet.author },
					{ $pull: { sheets: sheet._id } }
				)
					.then((user) => {
						res.status(200).json({
							message: 'Sheet Deleted Successfully',
							data: sheet,
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							message: 'Internal Server Error',
							data: {},
						});
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
	makeNewBlock(req, res, next) {
		const sheetId = req.params.sheetId;
		const nameOfBlock = req.body.blockName;
		let properties = [];
		let newSheetItem = new SheetItem({
			name: nameOfBlock,
			properties: properties,
		});
		newSheetItem
			.save()
			.then((block) => {
				Sheet.findOneAndUpdate(
					{ _id: mongoose.Types.ObjectId(sheetId) },
					{ $push: { sheetData: block._id } },
					{ new: true }
				)
					.populate('sheetData')
					.lean()
					.populate('author', 'username')
					.then((Sheet) => {
						res.status(200).json({
							message: 'Block Created Successfully',
							data: Sheet,
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							message: 'Internal Server Error',
							data: {},
						});
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
	editBlock(req, res, next) {
		let block = JSON.parse(req.body.data);
		SheetItem.findOneAndUpdate(
			{ _id: mongoose.Types.ObjectId(block._id) },
			{ properties: block.properties}
		)
			.then((block) => {
				res.status(200).json({
					message: 'Block Updated Successfully',
					data: block,
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
	deleteBlock(req, res, next) {
		blockId = req.params.blockId;
		sheetId = req.params.sheetId;
		SheetItem.findOneAndDelete({ _id: mongoose.Types.ObjectId(blockId) })
			.then((block) => {
				Sheet.findOneAndUpdate(
					{ _id: mongoose.Types.ObjectId(sheetId) },
					{ $pull: { sheetData: block._id } }
				)
					.then((sheet) => {
						res.status(200).json({
							message: 'Block deleted Successfully',
							data: sheet,
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							message: 'Internal Server Error',
							data: {},
						});
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

module.exports = SheetController;
