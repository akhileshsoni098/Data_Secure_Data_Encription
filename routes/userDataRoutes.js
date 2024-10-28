const express = require('express');
const { createUser, updateUserData, getUserData } = require('../controllers/userControllers');

const router = express.Router()

router.route('/create').post(createUser)
router.route('/update/:userId').put(updateUserData)
router.route('/get/:userId').get(getUserData)

module.exports = router
