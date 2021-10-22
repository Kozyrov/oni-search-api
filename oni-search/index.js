const axios = require("axios");

const conductSearch = async (term) => {
    try {
        return await axios.get("https://kitsu.io/api/edge/anime?", {
            "params": {
                "filter[text]": encodeURIComponent(term)
            }
        }).then((res) => {
            return res.data;
        });
    } catch (err) {
        throw new Error(`search failed: ${err}`);
    }

}

module.exports = async (context, req) => {
    try {
        const value = (req.query.value || (req.body && req.body.value));

        if (!value) {

            context.res = {
                status: 400,
                message: "include valid search term"
            };
            return;
        };

        const result = await conductSearch(value);

        context.res = {
            status: 200,
            body: result,
            contentType: "application/json"
        };

    } catch(err) {
        context.res = {
            status: 500,
            err: err.message
        };
    };
};
