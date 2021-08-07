"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const shortid_1 = __importDefault(require("shortid"));
const mongoose_1 = __importDefault(require("mongoose"));
let firstUserIdTest = "";
const firstUserBody = {
    email: `marcos.henrique+${shortid_1.default.generate()}@toptal.com`,
    password: "Sup3rSecret!23"
};
let accessToken = "";
let refreshToken = "";
const newFirstName = "Jose";
const newFirstName2 = "Paulo";
const newLastName2 = "Faraco";
describe("users and auth endpoints", function () {
    let request;
    before(function () {
        request = supertest_1.default.agent(app_1.default);
    });
    after(function (done) {
        // shut down the Express.js server, close our MongoDB connection, then tell Mocha we're done:
        app_1.default.close(() => {
            mongoose_1.default.connection.close(done);
        });
    });
    it("should allow a POST to /users", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/users").send(firstUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body.id).to.be.a("string");
            firstUserIdTest = res.body.id;
        });
    });
    it("should allow a POST to /auth", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/auth").send(firstUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body.accessToken).to.be.a("string");
            accessToken = res.body.accessToken;
            refreshToken = res.body.refreshToken;
        });
    });
    it("should allow a GET from /users/:userId with an access token", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/${firstUserIdTest}`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body._id).to.be.a("string");
            chai_1.expect(res.body._id).to.equal(firstUserIdTest);
            chai_1.expect(res.body.email).to.equal(firstUserBody.email);
        });
    });
    describe("with a valid access token", function () {
        it("should allow a GET from /users", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .get(`/users`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send();
                chai_1.expect(res.status).to.equal(403);
            });
        });
        it("should disallow a PATCH to /users/:userId", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .patch(`/users/${firstUserIdTest}`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({
                    firstName: newFirstName
                });
                chai_1.expect(res.status).to.equal(403);
            });
        });
        it("should disallow a PUT to /users/:userId with an nonexistent ID", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/users/i-do-not-exist`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: "Marcos",
                    lastName: "Silva",
                    permissionFlags: 256
                });
                chai_1.expect(res.status).to.equal(404);
            });
        });
        it("should disallow a PUT to /users/:userId trying to change the permission flags", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/users/${firstUserIdTest}`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: "Marcos",
                    lastName: "Silva",
                    permissionFlags: 256
                });
                chai_1.expect(res.status).to.equal(400);
                chai_1.expect(res.body.errors).to.be.an("array");
                chai_1.expect(res.body.errors).to.have.length(1);
                chai_1.expect(res.body.errors[0]).to.equal("User cannot change permission flags");
            });
        });
        it("should allow a PUT to /users/:userId/permissionFlags/2 for testing", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/users/${firstUserIdTest}/permissionFlags/2`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({});
                chai_1.expect(res.status).to.equal(204);
            });
        });
        describe("with a new set of permission flags", function () {
            it("should allow a POST to /auth/refresh-token", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .post("/auth/refresh-token")
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send({ refreshToken });
                    chai_1.expect(res.status).to.equal(201);
                    chai_1.expect(res.body).not.to.be.empty;
                    chai_1.expect(res.body).to.be.an("object");
                    chai_1.expect(res.body.accessToken).to.be.a("string");
                    accessToken = res.body.accessToken;
                    refreshToken = res.body.refreshToken;
                });
            });
            it("should allow a PUT to /users/:userId to change first and last names", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .put(`/users/${firstUserIdTest}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send({
                        email: firstUserBody.email,
                        password: firstUserBody.password,
                        firstName: newFirstName2,
                        lastName: newLastName2,
                        permissionFlags: 2
                    });
                    chai_1.expect(res.status).to.equal(204);
                });
            });
            it("should allow a GET from /users/:userId and should have a new full name", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .get(`/users/${firstUserIdTest}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send();
                    chai_1.expect(res.status).to.equal(200);
                    chai_1.expect(res.body).not.to.be.empty;
                    chai_1.expect(res.body).to.be.an("object");
                    chai_1.expect(res.body._id).to.be.a("string");
                    chai_1.expect(res.body.firstName).to.equal(newFirstName2);
                    chai_1.expect(res.body.lastName).to.equal(newLastName2);
                    chai_1.expect(res.body.email).to.equal(firstUserBody.email);
                    chai_1.expect(res.body._id).to.equal(firstUserIdTest);
                });
            });
            it("should allow a DELETE from /users/:userId", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .delete(`/users/${firstUserIdTest}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send();
                    chai_1.expect(res.status).to.equal(204);
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3QvdXNlcnMvdXNlcnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QiwwREFBa0M7QUFDbEMsK0JBQThCO0FBQzlCLHNEQUE4QjtBQUM5Qix3REFBZ0M7QUFFaEMsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLEtBQUssRUFBRSxtQkFBbUIsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYTtJQUN6RCxRQUFRLEVBQUUsZ0JBQWdCO0NBQzNCLENBQUM7QUFFRixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUM1QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFDOUIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBRTlCLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtJQUNuQyxJQUFJLE9BQWlDLENBQUM7SUFDdEMsTUFBTSxDQUFDO1FBQ0wsT0FBTyxHQUFHLG1CQUFTLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFVBQVUsSUFBSTtRQUNsQiw2RkFBNkY7UUFDN0YsYUFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDYixrQkFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTs7WUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENB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