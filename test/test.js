var assert = require('assert');
var docsnew = require('../docs-new.mjs');
describe('Basic GET operations for the test database', function () {
    describe('findall()', function () {
      it('All entires in the collection should be returned.', function () {
        assert.ok(docsnew.findAll().length > 0);
      });
    });
  });
