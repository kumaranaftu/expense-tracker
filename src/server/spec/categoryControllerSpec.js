const sinon = require("sinon");
const sinonExpressMock = require("sinon-express-mock");

describe("Test cases CategoryControler : ", () => {

  describe("createCategory fn - ", () => {

    it("Should not allow an empty category", done => {

      // TODO Need to revisit this unit test case and complete the remaining

      let Category = function(category) {
        this.save = function() {},
          this.validate = function() {
            return Promise.reject({
              errors: {
                "name": {
                  message: "Value for 'name' is empty"
                }
              }
            })
          }
      };

      let requestInfo = {
        body: {
          "name": ""
        }
      };

      const request = sinonExpressMock.mockReq(requestInfo);
      const response = sinonExpressMock.mockRes();

      const categoryController = require("../controllers/categoryController")(Category);
      categoryController.createCategory(request, response)
        .then(data => {
          expect(response.status.calledWith(400)).toBeTruthy();
          expect(response.send.calledWith({
            success: false,
            error: {
              name: "Value for 'name' is empty"
            }
          })).toBeTruthy();
          done();
        })
        .catch((error) => {
          done.fail("Failed");
        });
    });
  });

});
