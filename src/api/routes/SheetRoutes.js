const express = require('express');
const router = express.Router();
const SheetController = require('../controllers/SheetController');

// Sheet Related Routes
router.get('/:id', SheetController.getSheetDetails);
router.get('/:userId/all', SheetController.getAllSheets);
router.post('/new', SheetController.makeNewSheet);
router.delete('/delete/:id', SheetController.deleteSheet);

// Block Related Routes
router.post('/block/new', SheetController.makeNewBlock);
router.post('/block/edit/:id', SheetController.editBlock);
router.delete('/:sheetId/block/delete/:sheetId/:blockId', SheetController.deleteBlock);

module.exports = router;
