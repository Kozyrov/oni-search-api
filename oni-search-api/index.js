const titleSearch = async (context, req) => {

    try {
        context.log('oni-search processed title search.');

        // Read incoming data
        const value = (req.query.value || (req.body && req.body.value));

        // fail if incoming data is required
        if (!value) {

            context.res = {
                status: 400
            };
            return;
        }

        // Add or change code here
        const message = `search by: ${value}`;

        // Construct response
        const responseJSON = {
            "value": value,
            "message": message,
            "success": true
        }

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
    }
}

const oniSearch = {
    title: titleSearch
}

module.exports = oniSearch;