import app from "../../app";
import supertest from "supertest";
import { expect } from "chai";
import shortid from "shortid";
import mongoose from "mongoose";

const firstUserBody = {
  email: `new+${shortid.generate()}@gmail.com`,
  password: "Sup3rSecret!23",
  name: "Ivo iturrieta"
};

let accessToken = "";
let refreshToken = "";

describe("users and auth endpoints", function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });
  after(function (done) {
    // shut down the Express.js server, close our MongoDB connection, then tell Mocha we're done:
    app.close(() => {
      mongoose.connection.close(done);
    });
  });

  it("should allow a POST to /auth", async function () {
    const res = await request.post("/auth").send(firstUserBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.accessToken).to.be.a("string");
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it("should allow a POST to /login", async function () {
    const res = await request.post("/login").send(firstUserBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.accessToken).to.be.a("string");
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });
});
