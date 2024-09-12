"use strict";

import { MongoClient, ObjectId } from 'mongodb';
const mongo = MongoClient;
var dsn;
var collection
if (process.env.NODE_ENV === 'test') {
    dsn = "mongodb://localhost:27017/testdocs";
    collection = "testcollection";
}

const dbhandler = {
    /**
     * Finds all documents in the collection
     * @returns {Promise<Object[]>}
     */
    findAll: async function findAll() {
            const client  = await mongo.connect(dsn);
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
        const client  = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.find({_id: new ObjectId(id)}).toArray();
    
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
        const client  = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection('testcollection');
        const doc = {title: title, content: content}
        const res = await col.insertOne(doc);
    
        await client.close();
    
        return res;
    },

        /**
     * Finds a document in the database by its ObjectId, or undefined
     * @param {string} id 
     * @returns {Promise<Object[]> | undefined>}
     */
        deleteWithId: async function deleteWithId(id) {
            const client  = await mongo.connect(dsn);
            const db = await client.db();
            const col = await db.collection('testcollection');
            const res = await col.deleteOne({_id: new ObjectId(id)});
        
            await client.close();
        
            return res;
        },
    
}

export default dbhandler;
