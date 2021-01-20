const User = require('../../models/User');
const Sheet = require('../../models/Sheet');
const SheetItem = require('../../models/SheetItem');

const SheetController = {
	getSheetDetails(req, res, next) {
		Sheet.findOne({ _id: req.params.id })
			.populate('sheetData')
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
		Sheet.find({ author: userId })
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
					{ _id: sheet.author },
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
		Sheet.findOneAndDelete({ _id: req.params.id })
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
	makeNewBlock(req, res, next) {},
	editBlock(req, res, next) {},
	deleteBlock(req, res, next) {},
};

module.exports = SheetController;
