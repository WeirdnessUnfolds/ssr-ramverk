"use strict";

const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/docs";

const docs = {
    findAll: async function findAll() {
            const client  = await mongo.connect(dsn);
            const db = await client.db();
            const col = await db.collection(crowd);
            const res = await col.find({}).toArray();
        
            await client.close();
        
            return res;
    },

    findWithId: async function findWithId(id) {
        const client  = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(crowd);
        const res = await col.find({_id:id}).toArray();
    
        await client.close();
    
        return res;
    },

    addDocument: async function addDocument(title, content) {
        const client  = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(crowd);
        const doc = {title: title, content: content}
        const res = await col.insertOne(doc);
    
        await client.close();
    
        return res;
    },
    
}

export default docs;