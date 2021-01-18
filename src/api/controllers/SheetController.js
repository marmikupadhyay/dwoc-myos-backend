const SheetController = {
	getSheetDetails(req, res, next) {
		res.status(200).json({
			message: 'Sheet Details Fetched Succesfully',
			data: { sheetname: 'xyz' },
		});
	},
	getAllSheets(req, res, next) {},
	makeNewSheet(req, res, next) {},
	deleteSheet(req, res, next) {},
	makeNewBlock(req, res, next) {},
	editBlock(req, res, next) {},
	deleteBlock(req, res, next) {},
};

module.exports = SheetController;
