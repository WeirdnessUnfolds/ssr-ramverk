import { expect } from 'chai';
import dbhandler from '../docs-new.mjs';


let testObjectId = '';


describe('Signup', () => {
    it('sendUser() creates a new user and POSTS it to the database.', (done) => {
        dbhandler.sendUser("testuser", "testemail", "encryptedtestpassword").then((result) => {
            testObjectId = result.insertedId;
            expect(result.acknowledged).to.equal(true);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('Login', () => {
    it('A user logs in with correct credentials.', (done) => {
        dbhandler.matchPass("testuser", "encryptedtestpassword").then((result) => {
            expect(result).to.equal("Match");
            done();
        }).catch((error) => {
            done(error);
        });
    });
})
