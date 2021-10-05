const oniAuth = require("../services/oni-auth");
require('dotenv').config();

module.exports = async (context, req) => {
    const _oniAuth = new oniAuth();
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
        _oniAuth.requestMALAuthorization();       

        // Construct response
        const responseJSON = {
            "value": value,
            "message": message,
            "success": true,
            "verifier": _oniAuth.code_verifier,
            "challenge": _oniAuth.code_challenge
        };

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseJSON,
            contentType: 'application/json'
        };
    } catch(err) {
        //testable without async
        context.res = {
            status: 500,
            err: err.message
        };
    };
};
