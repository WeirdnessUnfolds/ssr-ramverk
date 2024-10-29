import { expect } from 'chai';
import dbhandler from '../docs-new.mjs';


describe('GET operations for database', () => {
    it('Findall() returns all documents in the test database before operations.', (done) => {
        dbhandler.findAll().then((result) => {
            expect(result.length).to.be.equal(3);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('Document operations', () => {
    let testObjectId;

    before(function(done) {
        dbhandler.addDocument().then((result) => {
            testObjectId = result.insertedId.toString();
            done();
        });
    });
    it('addDocument() creates a new document in the database', function(done) {
        dbhandler.addDocument().then((result) => {
            expect(result.acknowledged).to.equal(true);
            done();
        }).catch((error) => {
            done(error);
        });
    });
    it('findWithId() finds the chosen id in the database and returns the content', function(done) {
        dbhandler.findWithId(testObjectId).then((result) => {
            expect(result[0]._id.toString()).to.equal(testObjectId);
            done();
        }).catch((error) => {
            done(error);
        });
    });
    it('updateDocument() updates the document specified by id', function(done) {
        dbhandler.updateDocument(testObjectId, "En titel", "Ett innehåll").then((result) => {
            expect(result.modifiedCount).to.equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });
 
    it("A user is added to the shareWith array of a document", function(done) {
        dbhandler.shareDocument(testObjectId, "testuser").then((result) => {
            expect(result.modifiedCount).to.equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('deleteWithId() deletes the document specified by id', function(done) {
        dbhandler.deleteWithId(testObjectId).then((result) => {
            expect(result.deletedCount).to.equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it("A comment is added to a document", function(done) {
        dbhandler.updateComments(testObjectId, "Test commment").then((result) => {
            expect(result.modifiedCount).to.equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});



describe('Check that the database contains three objects after all the changes', () => {
    it('Findall() returns all documents in the test database', (done) => {
        dbhandler.findAll().then((result) => {
            expect(result.length).to.be.equal(4);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
