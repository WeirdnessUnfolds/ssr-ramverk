import { expect } from 'chai';
import dbhandler from '../docs-new.mjs';

let testObjectId = '';


describe('GET operations for database', () => {
    it('Findall() returns all documents in the test database', (done) => {
        dbhandler.findAll().then((result) => {
            expect(result.length).to.be.equal(3);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('POST create new document in database', () => {
    it('addDocument() creates a new document in the database', (done) => {
        dbhandler.addDocument().then((result) => {
            testObjectId = result.insertedId;
            expect(result.acknowledged).to.equal(true);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('GET return object by Id', () => {
    it('findWithId() finds the chosen id in the database and returns the content', (done) => {
        dbhandler.findWithId(testObjectId).then((result) => {
            expect(result[0]).to.have.property('title');
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('POST update object by Id', () => {
    it('updateDocument() updates the document specified by id', (done) => {
        dbhandler.updateDocument(testObjectId, "En titel", "Ett innehåll").then((result) => {
            expect(result.modifiedCount).to.equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('POST delete object by Id', () => {
    it('deleteWithId() deletes the document specified by id', (done) => {
        dbhandler.deleteWithId(testObjectId).then((result) => {
            expect(result.deletedCount).to.equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('Check that the database contains three objects after all the changes', () => {
    it('Findall() returns all documents in the test database', (done) => {
        dbhandler.findAll().then((result) => {
            expect(result.length).to.be.equal(3);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
