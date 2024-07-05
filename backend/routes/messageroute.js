const express= require('express');
const { protect } = require('../midleware/authMiddleware');
const { sendmessage, allmessages } = require('../controllers/messagecontroller');
const router =express.Router()

router.route('/').post(protect,sendmessage);
router.route('/:chatId').get(protect,allmessages)

module.exports = router