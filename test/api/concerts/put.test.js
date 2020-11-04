const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {

  beforeEach(async () => {

    try {

      const testConcOne = new Concert({ "_id": "5d9f1140f10a81216cfd4408", "performer":"John Doe","genre":"Rock","price":25,"day":1,"image":"/img/uploads/1fsd324fsdg.jpg"});
      await testConcOne.save();

    } catch(err) {
      console.log(err);
    }

});

  it('/should update chosen concert with data received in body', async () => {
    const res = await request(server).put('/api/concerts/5d9f1140f10a81216cfd4408').send({ performer: 'Amanda Doe', genre: 'Pop', price: 30, day: 3 });
    const updatedConcert = await Concert.findById('5d9f1140f10a81216cfd4408');

    expect(res.status).to.be.equal(200);
    expect(updatedConcert.performer).to.be.equal('Amanda Doe');
    expect(updatedConcert.genre).to.be.equal('Pop');
    expect(updatedConcert.price).to.be.equal(30);
    expect(updatedConcert.day).to.be.equal(3);
  });

  afterEach(async () => {
    await Concert.deleteMany();
  })


});
