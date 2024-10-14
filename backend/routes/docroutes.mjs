import express from 'express';
import dbhandler from '../docs-new.mjs';
var router = express.Router();

router.get("/createdoc", async (req, res) => {
    const data = {
        data: {
            info: "Here, a document will be created."
        }


    };

    res.json(data);
});


router.post("/createdoc", async (req, res) => {
    const data = req.body;

    console.log("Ny titel:", data.title);
    dbhandler.addDocument(data.title,
        data.content).then(result => res.json(result))
        .catch(err => console.log(err));
});


router.get('find/:id', async (req, res) => {
    dbhandler.findWithId(req.params.id).then(result => res.json(result))
        .catch(err => console.log(err));
});

router.put("/:id", async (req, res) => {
    res.status(204).send();
});

router.post('/delete/:id', async (req, res) => {
    dbhandler.deleteWithId(req.params.id).then(result => res.json(result))
        .catch(err => console.log(err));
});

router.post("/update/:id", async (req, res) => {
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



export default router;
