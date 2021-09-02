import {validateUrl} from "../src/client/js/validateUrl.js"


describe("Testing the validate url functionality", () => {

    test("Testing the validateUrl() function", () => {

          let url = "https://wwwgooglecom"

          // this should return false as there is not at least one dot in the url

           expect(validateUrl(url)).toEqual(false);

})});
