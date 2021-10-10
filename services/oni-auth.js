'use strict'
const randomString = require("randomstring");
const { createHash } = require("crypto");
const { fromBase64 } = require("base64url");
const { env } = require("process");
const axios = require("axios");
require('dotenv').config();
 
module.exports = class oniAuth {   
    auth_endpoint = env.MAL_OAUTH_ENDPOINT;
    response_type = "code";
    client_id = env.MAL_APP_ID;
    request_state = "";

    constructor() {
        this.code_verifier = randomString.generate(128);
    };

    get code_challenge() {
        return this.generateCodeChallenge();
    };

    generateCodeChallenge = () => {
        const generated_digest = createHash("sha256").update(this.code_verifier).digest("base64");

        const challenge = fromBase64(generated_digest);

        return challenge;
    };

    requestMALAuthorization = async () => {
        try {
            await fetch(env.MAL_OAUTH_ENDPOINT, {
                "method": "POST",
                "params": { 
                    "reponse_type": this.response_type,
                    "client_id": this.client_id,
                    "code_challenge": this.code_challenge
                },
                "data": {
                    "grant_type": client_credentials
                }
            }).then((res) => {
                console.log(`response recieved: ${res}`);
            });
        } catch (err) {
            console.error(`request for authorization failed - Status: ${err}`); 
        }
    }
};