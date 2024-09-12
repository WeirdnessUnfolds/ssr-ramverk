import express from 'express';
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
   const data = {
       data: {
           info: "A document",
           id: req.params.id
       }


   }
   res.json(data);
});

router.put("/:id", async (req, res) => {
   res.status(204).send();
});

export default router;
