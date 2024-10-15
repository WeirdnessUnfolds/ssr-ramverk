import dbhandler from '../docs-new.mjs';
import express from 'express';
import checkToken from './middleware/checkToken.mjs';
var router = express.Router();


router.get('/', (req, res, next) => checkToken(req, res, next), async (req, res) => {
    dbhandler.findAll().then(result => res.json(result))
        .catch(err => console.log(err));
});


export default router;
