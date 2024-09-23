import {  expect } from 'chai'
import dbhandler from '../docs-new.mjs';



describe('GET operations for database', () => {
    it('Findall() returns all documents in the test database', (done) => {
      console.log(dbhandler.findAll())
      dbhandler.findAll().then((result) => {
        expect(result.length).to.be.greaterThan(3);
        done();
    }).catch((error) => {
      done(error);
    });
  });
});
