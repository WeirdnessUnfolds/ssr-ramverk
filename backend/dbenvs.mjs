"use strict";
import 'dotenv/config';

let dsn = "";
let collection = "";

if (process.env.NODE_ENV === 'test') {
    dsn = "mongodb://localhost:27017/testdocs";
    collection = "testcollection";
} else if (process.env.NODE_ENV === 'integration-test') {
    dsn = "mongodb://localhost:27017/int-testdocs";
    collection = "int-testcollection";
} else {
    dsn = `mongodb+srv://${process.env.DB_USER}
:${process.env.DB_PASS}@jsramverk.owzo2.mongodb.net/?retryWrites=true&w=majority&appName=jsramverk`;
    collection = "docscollection";
}

export { dsn, collection };
