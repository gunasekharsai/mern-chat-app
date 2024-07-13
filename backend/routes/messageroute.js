const express= require('express');
const { protect } = require('../midleware/authMiddleware');
const { sendmessage, allmessages, deleteMessage } = require('../controllers/messagecontroller');
const router =express.Router()

router.route('/').post(protect,sendmessage);
router.route('/:chatId').get(protect,allmessages)
router.route('/:messageId').delete(protect,deleteMessage);
module.exports = router