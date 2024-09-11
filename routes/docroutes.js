var express = Require('express');
var router = express.Router();

app.get("/createdoc", async (req, res) => {
    const data = {
       data: {
           info: "Here, a document will be created."
       }


   }
   res.json(data);
});


app.post("/createdoc", async (req, res) => {
   res.status(201).json({
       data: {
           info: "A POST request was detected and the API returns a status of 201."
       }


   });
   res.json(data);
});


app.get('/:id', async (req, res) => {
   const data = {
       data: {
           info: "A document with the id " + req.params.id + " will be shown here."
       }


   }
   res.json(data);
});

app.put("/:id", async (req, res) => {

   res.status(204).json({
       data: {
           info: "A PUT request was detected and the API returns a status of 204."
       }


   });
});

module.exports = router;
