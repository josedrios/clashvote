const express = require('express');
const { getPlayer, getClans, getClanInfo } = require('../controllers/clashController');

const router = express.Router();

router.get('/players/:tag', getPlayer);
router.get('/clans/:name', getClans);
router.get('/clan-info/:tag', getClanInfo);

module.exports = router;