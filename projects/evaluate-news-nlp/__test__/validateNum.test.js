import {validateNum} from "../src/client/js/validators.js"


describe("Testing the validate number functionality", () => {

    test("Testing the validateNum() function", () => {

          let num = "55a"

          // this should return false as the input does not include only numbers

           expect(validateNum(num)).toEqual(false);

    })

    test("Testing the validateNum() function", () => {

           let num = "1001"

           // this should return false as the input is longer than 3 digits

            expect(validateNum(num)).toEqual(false);

})});
