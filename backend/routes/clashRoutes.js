const express = require('express');
const { getPlayer, getClans, getClanInfo } = require('../controllers/clashController');

const router = express.Router();

router.get('/players/:tag', getPlayer);
router.get('/clans/:tag', getClanInfo);
router.get('/clans/search/:name', getClans);

module.exports = router;