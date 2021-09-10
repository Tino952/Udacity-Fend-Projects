jest.mock("../src/client/js/asyncUtils.js");

import {getGeonames} from "../src/client/js/app.js"

describe("function should remove commas in input, return a valid api key and resolve \
to provide an array of data", () => {

    test("testing that getGeonames returns an array of data", () => {

      let inp = "Berlin, Berlin, DE";

      getGeonames(inp).then(result => {
        expect(result).toEqual(["a","b"]);
      })
})
});
