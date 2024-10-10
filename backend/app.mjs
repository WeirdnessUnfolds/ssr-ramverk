import 'dotenv/config';

const port = process.env.PORT || 3539;

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import methodOverride from 'method-override';
import database from './db/database.mjs';
import base from './routes/baseroutes.mjs';
import docroutes from './routes/docroutes.mjs';
import { Server } from "socket.io";
import { createServer } from 'http';
import dbhandler from './docs-new.mjs';

const app = express();

app.disable('x-powered-by');
app.use(methodOverride('_method'));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

let timeout;

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on("content", function (data) {

        socket.join(data["_id"]);
        // io.emit("content", data);
        io.in(data["_id"]).emit("content", data);

        clearTimeout(timeout);
        timeout = setTimeout(async function () {
            console.log("spara data");

            await dbhandler.updateDocument(data["_id"], data["title"], data["content"]);

        }, 2000);
    });

});


app.use(cors({
    origin: ['https://www.student.bth.se', 'http://localhost:5173']
}));
app.use(express.static(path.join(process.cwd(), "public")));

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/all', base);
app.use('/', docroutes);

app.use((req, res, next) => {
    var error = new Error("API endpoint not found");

    error.status = 404;
    next(error);
});
httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});