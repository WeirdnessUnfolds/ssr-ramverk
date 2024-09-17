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
   res.status(201).json({
       data: {
           info: "A POST request was detected and the API returns a status of 201."
       }


   });
   res.json(data);
});


router.get('/:id', async (req, res) => {
    dbhandler.findWithId(req.params.id).then(result => res.json(result))
    .catch(err => console.log(err));
});

router.put("/:id", async (req, res) => {
   res.status(204).send();
});

export default router;
