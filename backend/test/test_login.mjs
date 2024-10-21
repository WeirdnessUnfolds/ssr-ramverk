import { expect } from 'chai';
import dbhandler from '../docs-new.mjs';
import bcrypt from 'bcryptjs';
import sinon from 'sinon';
import mongo from 'mongodb';

let testObjectId = '';
const consoleStub = sinon.stub(console, 'error');


describe('Signup', () => {
    it('sendUser() creates a new user and POSTS it to the database.', async () => {
        const password = 'encryptedtestpassword';
        const hashedPass = await bcrypt.hash(password, 12);
        const result = await dbhandler.sendUser("testuser", "testemail", hashedPass);

        expect(result.acknowledged).to.equal(true);
    });
});

describe('Login', () => {
    it('A user logs in with correct credentials and the password is matched correctly.', (done) => {
        dbhandler.matchPass("testuser", "encryptedtestpassword").then((result) => {
            expect(result).to.equal("Match");
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('A user logs in with wrong credentials and the password is matched incorrectly.', (done) => {
        dbhandler.matchPass("testuser", "wrong").then((result) => {
            expect(result).to.equal("Wrong password.");
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('A user logs in with a username that does not exist.', (done) => {
        dbhandler.matchPass("nonexistantuser", "wrong").then((result) => {
            expect(result).to.equal("No user exists with this username.");
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('An error should be thrown when the password is invalid.', (done) => {
        const username = 'testuser';
        const password = 34234;

        dbhandler.matchPass(username, password).then(() => {
            expect(consoleStub.calledWith(sinon.match.instanceOf(Error))).to.be.true;
            done();
            consoleStub.restore();
        }).catch((error) => {
            done(error);
        });
    });
});
