// test/auth.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");
const app = require("../index");

const should = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(app);

const User = require("../models/user");

describe("User", function () {
  it("should not be able to signin if they have not registered", function (done) {
    agent
      .post("/signin", { email: "wrong@example.com", password: "nope" })
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });

  it('should be able to signup', function (done) {
    User.findOneAndRemove({ username: 'testone' }, function() {
      agent
        .post('/signup')
        .send({ username: 'testone', password: 'password' })
        .end(function (err, res) {
          console.log(res.body);
          res.should.have.status(200);
          agent.should.have.cookie('nToken');
          done();
        });
    });
  });
});
