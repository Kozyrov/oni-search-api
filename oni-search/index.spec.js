const oniSearch = require('./index.js');
const context = require('../testing/defaultContext.js');

test('if title search receives invalid user input then it should return 400 status', async () => {
    const stubRequest = {
        query: { value: null }
    };

    await oniSearch(context, stubRequest);

    expect(context.res.status).toEqual(400);
});

test('if title search receives valid user input then it should return a response containing "success"', async () => {
    const stubRequest = {
        query: { value: "anyvalue" }
    };

    await oniSearch(context, stubRequest);

    expect(context.res.body.success).toBe(true);
});
