import { expect } from 'chai';
import dbhandler from '../docs-new.mjs';
import bcrypt from 'bcryptjs';

let testObjectId = '';


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
});
