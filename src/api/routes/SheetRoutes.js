const express = require("express");
const { getSheetDetails } = require("../controllers/SheetController");
const router = express.Router();
const SheetController = require("../controllers/SheetController");

router.get("/:id", getSheetDetails);

module.exports = router;
