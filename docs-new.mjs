"use strict";

import { MongoClient, ObjectId } from 'mongodb';
const mongo = MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/testdocs";

const dbhandler = {
    findAll: async function findAll() {
            const client  = await mongo.connect(dsn);
            const db = await client.db();
            const col = await db.collection('testcollection');
            const res = await col.find({}).toArray();
        
            await client.close();
        
            return res;
    },


    findWithId: async function findWithId(id) {
        const client  = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection('testcollection');
        const res = await col.find({_id: new ObjectId(id)}).toArray();
    
        await client.close();
    
        return res;
    },

    addDocument: async function addDocument(title, content) {
        const client  = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection('testcollection');
        const doc = {title: title, content: content}
        const res = await col.insertOne(doc);
    
        await client.close();
    
        return res;
    },
    
}

export default dbhandler;
