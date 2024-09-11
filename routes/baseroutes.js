var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    const data = {
        data: {
            info: "Here, all documents will be shown."
        }


    }
    res.json(data);
});


module.exports = router;
