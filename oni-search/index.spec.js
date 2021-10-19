const oniSearch = require("./index");
const context = require("../testing/defaultContext");

test("if title search receives invalid user input then it should return 400 status", async () => {
    const stubRequest = {
        query: { value: null }
    };

    await oniSearch(context, stubRequest);

    expect(context.res.status).toEqual(400);
});

test("if title search receives valid user input then it should return a 200 status code", async () => {
    const stubRequest = {
        query: { value: "anyvalue" }
    };

    await oniSearch(context, stubRequest);

    expect(context.res.status).toBe(200);
});
