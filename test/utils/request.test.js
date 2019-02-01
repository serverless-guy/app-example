import { requestGet, requestPost } from "@utils/request"
import "chai/register-should"
import * as chai from "chai"
import * as nock from "nock"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)

describe("request", () => {
  beforeEach(() => {
    nock("http://localhost:3000")
      .get("/api/v1/users/2")
      .reply(200, require("../data/response.json"))

    nock("http://localhost:3000")
      .post("/api/v1/users")
      .reply(200, { "id": 3, "status": "CREATED" })

    
    nock("http://localhost:3000")
      .get("/api/v1/users/3")
      .reply(404, {})

    nock("http://localhost:3000")
      .get("/api/v1/users/4")
      .reply(500, {})

    nock("http://localhost:3000")
      .post("/api/v1/users/3")
      .reply(404, {})

    nock("http://localhost:3000")
      .post("/api/v1/users/4")
      .reply(500, {})
  })

  it("should make GET request", (done) => {
    requestGet("http://localhost:3000/api/v1/users/2").then((r) => r.data).should.eventually.deep.equal({ "user": "admin", "id": 2 }).and.notify(done)
  })

  it("should make GET request (with options)", (done) => {
    requestGet("http://localhost:3000/api/v1/users/2", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((r) => r.data).should.eventually.deep.equal({ "user": "admin", "id": 2 }).and.notify(done)
  })
})
