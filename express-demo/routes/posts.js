const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
    res.send(req.params);
});

router.get('/:year/:month', (req, res) => {
    res.send(req.query);
});

module.exports = router;