const express = require('express');
const router = express.Router();
const SheetController = require('../controllers/SheetController');

// Sheet Related Routes
router.get('/:id', SheetController.getSheetDetails);
router.get('/all', SheetController.getAllSheets);
router.post('/new', SheetController.makeNewSheet);
router.delete('/delete', SheetController.deleteSheet);

// Block Related Routes
router.post('/block/new', SheetController.makeNewBlock);
router.post('/block/edit/:id', SheetController.editBlock);
router.delete('/:sheetId/block/delete', SheetController.deleteBlock);

module.exports = router;
