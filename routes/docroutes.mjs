import express from 'express';
import dbhandler from '../docs-new.mjs';
var router = express.Router();

router.get("/createdoc", async (req, res) => {
    const data = {
       data: {
           info: "Here, a document will be created."
       }


   }
   res.json(data);
});


router.post("/createdoc", async (req, res) => {
    dbhandler.addDocument("Det här är en ny titel", "Det här är det nya innehållet").then(result => res.json(result))
    .catch(err => console.log(err));
});


router.get('/:id', async (req, res) => {
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

export default router;
