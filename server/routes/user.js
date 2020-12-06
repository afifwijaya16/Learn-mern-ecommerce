const express = require('express');

const router = express.Router();
// route
router.get('/user', (req, res) => {
	res.json({
		data: 'hey you user node api',
	});
});

module.exports = router;
