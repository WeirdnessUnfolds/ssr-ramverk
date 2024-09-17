import dbhandler from '../docs-new.mjs';
import express from 'express'
var router = express.Router();


router.get('/', async (req, res) => {
    dbhandler.findAll().then(result => res.json(result))
    .catch(err => console.log(err));
});


export default router;
