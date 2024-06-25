const express = require('express');
const {registerUser} = require('../controllers/usercontrollers');
const {authUser, allUsers} = require('../controllers/usercontrollers');
const { protect } = require('../midleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser).get(protect ,allUsers);
router.post('/login',authUser);
module.exports = router;