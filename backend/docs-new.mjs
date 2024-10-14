"use strict";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { MongoClient, ObjectId } from 'mongodb';
const mongo = MongoClient;
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

const dbhandler = {
    /**
     * Finds all documents in the collection
     * @returns {Promise<Object[]>}
     */
    findAll: async function findAll() {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.find({}).toArray();

        await client.close();

        return res;
    },

    /**
     * Finds a document in the database by its ObjectId, or undefined
     * @param {string} id
     * @returns {Promise<Object[]> | undefined>}
     */
    findWithId: async function findWithId(id) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.find({ _id: new ObjectId(id) }).toArray();

        await client.close();

        return res;
    },

    /**
     * Adds a new document to the collection
     * @param {string} title - The title of the document
     * @param {string} content - The content of the document
     * @returns {Promise<Object>} - The result of the insert operation.
     */
    addDocument: async function addDocument(title, content) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const doc = { title: title, content: content };
        const res = await col.insertOne(doc);

        await client.close();

        return res;
    },

    /**
     * Finds a document in the database by its ObjectId, and deletes it or undefined
     * @param {string} id
     * @returns {Promise<Object[]> | undefined>}
     */
    deleteWithId: async function deleteWithId(id) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.deleteOne({ _id: new ObjectId(id) });

        await client.close();

        return res;
    },

    /**
     * Adds a new user to the users collection
     * @param {string} username - The username of the user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @returns {Promise<Object>} - The result of the insert operation
     */
    sendUser: async function sendUser(username, email, password) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");
        const nameentry = { username: username, email: email, password: password };
        const res = await col.insertOne(nameentry);

        await client.close();

        return res;
    },

    matchPass: async function matchPass(username, inputpassword) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");
        let resstring = "";

        try {
            const user = await col.findOne({ username: username });

            if (!user) {
                resstring = "No user exists with this username.";
            } else {
                const match = await bcrypt.compare(inputpassword, user.password);

                if (match) {
                    resstring = "Match";
                } else {
                    resstring = "Wrong password.";
                }
            }
        } catch (err) {
            console.error(err);
            resstring = err.message;
        }
        await client.close();
        return resstring;
    },

    /**
     * Finds a document in the database by its ObjectId, and updates it or undefined
     * @param {string} id
     * @returns {Promise<Object[]> | undefined>}
     */
    updateDocument: async function updateDocument(id, title, content) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.updateOne({ _id: new ObjectId(id) },
            { $set: { title: title, content: content } });

        await client.close();
        return res;
    },

};

export default dbhandler;
