const oniAuth = require("../services/oni-auth");
require('dotenv').config();

module.exports = async (context, req) => {
    const dispatchResponse = (data) => {
        // Construct response
        const responseJSON = {
            "value": value,
            "success": true,
        };

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseJSON,
            contentType: 'application/json'
        };
    }

    const conductSearch = async (searchTerm) => {
        fetch(`${process.env.KITSU_API_ROOT/SEARCH_ENDPOINT}=${searchTerm}`, {
            "mode":
        });
    }
    
    try {
        context.log('oni-search processed search.');

        // Read incoming data
        const value = (req.query.value || (req.body && req.body.value));

        // fail if incoming data is required
        if (!value) {

            context.res = {
                status: 400
            };
            return;
        };

        // Add or change code here
        await 

    } catch(err) {
        //testable without async
        context.res = {
            status: 500,
            err: err.message
        };
    };
};
