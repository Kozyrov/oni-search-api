const axios = require("axios");

const conductSearch = async (term) => {
    let response;
    try {
        await axios.get("https://kitsu.io/api/edge/anime?", {
            "params": {
                "filter[text]": encodeURIComponent(term)
            }
        }).then((res) => {
            response = res.data;
        });
    } catch (err) {
        throw new Error(`search failed: ${err}`);
    }

    return response;
}

module.exports = async (context, req) => {
    try {
        context.log("oni-search processed search.");

        // Read incoming data
        const value = (req.query.value || (req.body && req.body.value));

        // fail if incoming data is required
        if (!value) {

            context.res = {
                status: 400,
                message: "include valid search term"
            };
            return;
        };

        // Add or change code here
        const result = await conductSearch(value);

        context.res = {
            // status: 200, /* Defaults to 200 */
            status: 200,
            body: result,
            contentType: "application/json"
        };

    } catch(err) {
        //testable without async
        context.res = {
            status: 500,
            err: err.message
        };
    };
};
