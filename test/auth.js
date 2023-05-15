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

describe("User", () => {
  it("should not be able to signin if they have not registered", (done) => {
    agent
      .post("/signin", { email: "wrong@example.com", password: "nope" })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("should be able to signup", (done) => {
    User.findOneAndRemove({ username: "testone" }, () => {
      agent
        .post("/signup")
        .send({ username: "testone", password: "password" })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          agent.should.have.cookie("nToken");
          done();
        });
    });

    // logout
    it("should be able to logout", (done) => {
      agent.get("/logout").end((err, res) => {
        res.should.have.status(200);
        agent.should.not.have.cookie("nToken");
        done();
      });
    });
  });

  it("should be able to login", (done) => {
    agent
      .post("/login")
      .send({ username: "testone", password: "password" })
      .end((err, res) => {
        res.should.have.status(200);
        agent.should.have.cookie("nToken");
        done();
      });
  });
});
