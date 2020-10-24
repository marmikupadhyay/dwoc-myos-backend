const SheetController = {
  getSheetDetails(req, res, next) {
    res
      .status(200)
      .json({
        message: "Sheet Details Fetched Succesfully",
        data: { sheetname: "xyz" },
      });
  },
};

module.exports = SheetController;
