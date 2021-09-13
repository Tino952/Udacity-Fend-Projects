import request from 'supertest'
import app from "../../src/server/app.js"

describe("Testing the express server", () => {

    test("Testing a post request to receive the correct api key from server", async () => {

      // running function "getkeys" for "geonames" should return a 200 status code
      // from server.
      // The response should have a content type of text, with utf-8 encoding
      // This should also return the correct api key (last three digits are "952")
      // using supertest to mimic api endpoints from client side

      let apiKey = "geonames"

      const response = await request(app)
        .post("/apiKey")
        .set({'Content-Type' : 'text/plain'})
        .send(apiKey)
        .expect(200)

        // get text property of response, as it is not an object but a string being
        // sent from server

        let myResponse = JSON.parse(response.text);

        myResponse = myResponse.slice(-3);

        expect(response.headers['content-type']).toMatch(/(?=.*text)(?=.*utf-8)/);

        expect(myResponse).toBe('952');

    })

});
