import express from 'express';
import dbhandler from '../docs-new.mjs';
import jwt from 'jsonwebtoken';
import checkToken from './middleware/checkToken.mjs';
import sgMail from "@sendgrid/mail";
import generatePassword from './middleware/passwordgen.mjs';
import hashPass from './middleware/hashPass.mjs';
import userhandler from '../userhandler.mjs';
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
        data.content, data.sharedWith[1], data.type).then(result => {
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

router.delete('/delete/:id', (req, res, next) => checkToken(req, res, next), async (req, res) => {
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


    userhandler.checkUser(data.username, data.email).then(result => {
        if (!result) {
            userhandler.sendUser(data.username, data.email, data.password)
                .then(result => res.json(result))
                .catch(err => console.log(err));
        } else {
            res.send("User with this name or email already exists.")
        }
    });

    console.log("Användarnamn:", data.username);
    console.log("Hashat lösenord:", data.password);
    console.log("Email:", data.email);
});

router.post("/login", async (req, res) => {
    const data = req.body;

    userhandler.matchPass(data.username, data.password).then(result => res.json(result))
        .catch(err => console.log(err));
});

router.post("/gettoken", async (req, res) => {
    const username = req.body.username;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });

    res.send(token);
});

router.post("/share", async (req, res) => {
    const data = req.body;
    const password = generatePassword();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: data.mail, // Change to your recipient
        from: 'simon.langstrom@hotmail.com', // Change to your verified sender
        subject: 'Test invite',
        text: `Du har blivit inbjuden till att redigera ett dokument med texteditorn.
        Ditt användarnamn blir: ${data.mail.split('@')[0]}
        Ditt lösenord blir: ${password}
        Gå in på vår adress och skapa en användare med namnet ovan för att få åtkomst.`
    };


    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });

    dbhandler.shareDocument(data.id, data.mail.split('@')[0])
        .then(result => res.json(result))
        .catch(err => console.log(err));
    dbhandler.checkUser(data.mail.split('@')[0]).then(result => {
        if (!result) {
            dbhandler.sendUser(data.mail.split('@')[0], data.mail, hashPass(password));
        }
    });
});

export default router;
