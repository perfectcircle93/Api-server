const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {

  beforeEach(async () => {

    try {

      const testConcOne = new Concert({ "_id": "5d9f1140f10a81216cfd4408", "performer":"John Doe","genre":"Rock","price":25,"day":1,"image":"/img/uploads/1fsd324fsdg.jpg"});
      await testConcOne.save();

    } catch(err) {
      console.log(err);
    }

});

  it('/should delete concert with given id', async () => {
    const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
    const updatedConcert = await Concert.findById('5d9f1140f10a81216cfd4408');

    expect(res.status).to.be.equal(200);
    expect(updatedConcert).to.be.null;
  });

  afterEach(async () => {
    await Concert.deleteMany();
  })


});
