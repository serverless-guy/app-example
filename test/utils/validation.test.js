import { newUserValidation } from "@validations/users/newUserValidation"
import * as chai from "chai"
import "chai/register-should"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)

describe("validation", () => {

  it("should make GET request (with options)", () => {
    newUserValidation({}).should.eventually.be.fulfilled
  })
})
