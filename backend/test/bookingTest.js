const chai=require("chai");
var should=chai.should()
var expect=chai.expect;
var assert=chai.assert;
const request = require('supertest'); //work with http assertion
const app = require('../server');

describe('GET /Books', function() {
  it('return list of Books', function(done) {
     request(app)
      .get('/api/v1/book/allbook')
      .set('BearerToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWNjMmE0ZGNiZmUwNDRmZjE4NmIxMSIsImlhdCI6MTY3MTI3MTc1OSwiZXhwIjoxNjcxMzU4MTU5fQ.ousmvKMPV4vPjSXwoq6fJN-Pn7BfJnuzX3YTE3APKgA")
      .expect(200)
      .expect(res=>{
        console.log(JSON.stringify(res.body))
      }).end(done)
    //   .expect('Content-Type',/json/)
  })
})