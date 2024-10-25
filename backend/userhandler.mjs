"use strict";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import { dsn } from './dbenvs.mjs';
const mongo = MongoClient;

const userhandler = {


    checkUser: async function checkUser(username, mail) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");
        var res;

        res = await col.findOne({ $or: [{ email: mail }, { username: username }] });
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

    /**
     * Compares the input password with the stored password for the given user
     * @param {string} username - The username of the user
     * @param {string} inputpassword - The input password to compare with the stored password
     * @returns {Promise<string>} - A string indicating the result of the comparison
     */
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
            resstring = "An error occured with the encryption function.";
        }
        await client.close();
        return resstring;
    }
};

export default userhandler;
