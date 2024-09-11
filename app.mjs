import 'dotenv/config'

const port = process.env.PORT;

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import methodOverride from 'method-override';

const app = express();

app.disable('x-powered-by');
app.use(methodOverride('_method'));

app.use(express.static(path.join(process.cwd(), "public")));

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', async (req, res) => {
    const data = {
        data: {
            info: "Here, all documents will be shown."
        }


    }
    res.json(data);
});

app.use((req, res, next) => {
    var error = new Error("API endpoint not found");
    error.status = 404;
    next(error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
