import { expect } from 'chai';
import userhandler from '../userhandler.mjs';
import bcrypt from 'bcryptjs';
import sinon from 'sinon';
const consoleStub = sinon.stub(console, 'error');

describe('Signup', () => {
    it('sendUser() creates a new user and POSTS it to the database.', async () => {
        const password = 'encryptedtestpassword';
        const hashedPass = await bcrypt.hash(password, 12);
        const result = await userhandler.sendUser("testuser", "testemail", hashedPass);

        expect(result.acknowledged).to.equal(true);
    });
    it(`If the username is taken, the response should reflect that 
        and the database should not be updated.`, async () => {
        const password = 'encryptedtestpassword';
        const hashedPass = await bcrypt.hash(password, 12);
        const result = await userhandler.sendUser("testuser", "othertestemail", hashedPass);

        expect(result).to.equal("User with this name or email already exists.");
    });
    it(`If the email is taken, the response should reflect that 
        and the database should not be updated.`, async () => {
        const password = 'encryptedtestpassword';
        const hashedPass = await bcrypt.hash(password, 12);
        const result = await userhandler.sendUser("othertestuser", "testemail", hashedPass);

        expect(result).to.equal("User with this name or email already exists.");
    });
});


describe('Login', () => {
    it('A user logs in with correct credentials and the password is matched correctly.', (done) => {
        userhandler.matchPass("testuser", "encryptedtestpassword").then((result) => {
            expect(result).to.equal("Match");
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('A user logs in with wrong credentials and the password is matched incorrectly.', (done) => {
        userhandler.matchPass("testuser", "wrong").then((result) => {
            expect(result).to.equal("Wrong password.");
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('A user logs in with a username that does not exist.', (done) => {
        userhandler.matchPass("nonexistantuser", "wrong").then((result) => {
            expect(result).to.equal("No user exists with this username.");
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('An error should be thrown when the password is invalid.', (done) => {
        const username = 'testuser';
        const password = 34234;

        userhandler.matchPass(username, password).then(() => {
            expect(consoleStub.calledWith(sinon.match.instanceOf(Error))).to.be.true;
            done();
            consoleStub.restore();
        }).catch((error) => {
            done(error);
        });
    });
});
