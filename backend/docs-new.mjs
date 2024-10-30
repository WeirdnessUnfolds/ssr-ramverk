"use strict";
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';
import { dsn, collection } from './dbenvs.mjs';
const mongo = MongoClient;

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
    addDocument: async function addDocument(title, content, shareusername, type) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const doc = {
            title: title, content: content, sharedWith: ["admin", shareusername],
            comments: [], type: type
        };
        const res = await col.insertOne(doc);

        await client.close();

        return res;
    },

    /**
     * Shares a document with a specified username by adding them to the sharedWith array
     * @param {string} id - The ObjectId of the document to share
     * @param {string} shareusername - The username to share the document with
     * @returns {Promise<Object>} - The result of the update operation
     */
    shareDocument: async function shareDocument(id, shareusername) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.updateOne({ _id: new ObjectId(id) },
            { $addToSet: { sharedWith: shareusername } });

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

    /**
 * Finds a document in the database by its ObjectId, and sets comments or undefined
 * @param {string} id
 * @returns {Promise<Object[]> | undefined>}
 */
    updateComments: async function updateDocument(id, comments) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.updateOne({ _id: new ObjectId(id) },
            { $set: { comments: comments } });

        await client.close();
        return res;
    },

};

export default dbhandler;
