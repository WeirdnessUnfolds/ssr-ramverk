import express from 'express';
import dbhandler from '../docs-new.mjs';
import jwt from 'jsonwebtoken';
import checkToken from './middleware/checkToken.mjs';
var router = express.Router();

router.get("/createdoc", (req, res, next) => checkToken(req, res, next), async (req, res) => {
    const data = {
        data: {
            info: "Here, a document will be created."
        }


    };

    res.json(data);
});


router.post("/createdoc", (req, res, next) => checkToken(req, res, next), async (req, res) => {
    const data = req.body;

    dbhandler.addDocument(data.title,
        data.content, data.sharedWith[1]).then(result =>  {
        res.json(result);
    }).catch(err => console.log(err));
});


router.get('find/:id', (req, res, next) => checkToken(req, res, next), async (req, res) => {
    dbhandler.findWithId(req.params.id).then(result => res.json(result))
        .catch(err => console.log(err));
});

router.put("/:id", (req, res, next) => checkToken(req, res, next), async (req, res) => {
    res.status(204).send();
});

router.delete('/delete/:id', (req, res, next) => checkToken(req, res, next),  async (req, res) => {
    console.log(req.headers['x-access-token']);
    dbhandler.deleteWithId(req.params.id).then(result => res.json(result))
        .catch(err => console.log(err));
});

router.post("/update/:id", (req, res, next) => checkToken(req, res, next), async (req, res) => {
    const data = req.body;

    console.log("Uppdaterad titel:", data.title);

    dbhandler.updateDocument(req.params.id, data.title,
        data.content).then(result => res.json(result))
        .catch(err => console.log(err));
});

router.post("/signup", async (req, res) => {
    const data = req.body;


    dbhandler.sendUser(data.username, data.email, data.password).then(result => res.json(result))
        .catch(err => console.log(err));
    console.log("Användarnamn:", data.username);
    console.log("Hashat lösenord:", data.password);
    console.log("Email:", data.email);
});

router.post("/login", async (req, res) => {
    const data = req.body;

    dbhandler.matchPass(data.username, data.password).then(result => res.json(result))
        .catch(err => console.log(err));
});

router.post("/gettoken", async (req, res) => {
    const username = req.body.username;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });

    res.send(token);
});

export default router;
