var assert = require('assert');

describe('Array', function () {
    describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });

// Exempel på att testea med async/await
//   beforeEach(async function () {
//     await db.clear();
//     await db.save([tobi, loki, jane]);
//   });
  
//   describe('#find()', function () {
//     it('responds with matching records', async function () {
//       const users = await db.find({type: 'User'});
//       users.should.have.length(3);
//     });
//   });