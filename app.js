const express = require('express');
const bodyParser = require('body-parser');
const configJSON = require('./public/config/config-json');
const axios = require('axios');
const path = require('path');
const mustache = require("mustache-express");
require('dotenv/config');

function createApp() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.static(path.join(__dirname, 'public')));

    app.listen(port, () => {
        console.log(`Example app listening at port ${port}`);
    });

    return app
};

// setup the example app
function generateRoutes(app) {
    app.use(bodyParser.json());

    // Axios interceptor that always generate a token for Marketing Cloud APIs
    // axios.interceptors.request.use(async (config) => {
    //     if (!config.url.endsWith('token')) {
    //         await axios.post(`${process.env.urlAuth}v2/token`, {
    //             "grant_type": "client_credentials",
    //             "client_id": process.env.client_id,
    //             "client_secret": process.env.client_secret
    //         }).then(res => {
    //             token = res.data.access_token
    //             config.headers.Authorization = `Bearer ${token}`;
    //         })
    //     }
    // //     return config;
    // }, (error) => {
    //     // I cand handle a request with errors here
    //     return Promise.reject(error);
    // });



    // setup the index redirect
    app.get('/', (req, res) => {
        return res.redirect('index.html');
    });



    // setup index.html route
    app.get('*/index.html', (req, res) => {
        // you can use your favorite templating library to generate your html file, in this example I used mustache:
        app.engine('html', mustache());
        app.set('view engine', 'html');

        return res.render(path.join(__dirname, 'public', 'html', 'index.html'), {
            mustacheVar: 'example mustache'
        })

        // or just return a static file
        // return res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });



    // setup config.json route
    app.get('*/config.json', (req, res) => {
        // Journey Builder looks for config.json when the canvas loads.
        // We'll dynamically generate the config object with a function
        return res.status(200).json(configJSON(req));
    });

    // setup customActivity.js route
    app.get('*/customActivity.js', (req, res) => {
        return res.redirect('/js/customActivity.js');
    });

    // setup postmonger.js route
    app.get('*/postmonger.js', (req, res) => {
        return res.redirect('/js/postmonger.js');
    });






    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // CONFIGURATION
    // ```````````````````````````````````````````````````````
    // Reference:
    // https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/interaction-operating-states.htm

    app.post(['*/save', '*/publish', '*/validate', '*/stop'], (req, res) => {
        /**
         * Save and Validate are called when you validate de journey
         * Save, Validate and Publish are called when the journey is activated
         * Publish and Stop are called when the activity is stopped
         * 
         * 200 - Return a 200 if the configuraiton is valid.
         * 30x - Return if the configuration is invalid (this will block the publish phase)
         * 40x - Return if the configuration is invalid (this will block the publish phase)
         * 50x - Return if the configuration is invalid (this will block the publish phase)
         */
        console.log(`debug: ${req.originalUrl}`);
        return res.status(200).json({});
    });





    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // EXECUTING JOURNEY
    // ```````````````````````````````````````````````````````

    app.post('*/execute', (req, res) => {
        /**
         * Called when a contact is flowing through the Journey.
         * @return {[type]}
         * 200 - Processed OK
         * 3xx - Contact is ejected from the Journey.
         * 4xx - Contact is ejected from the Journey.
         * 5xx - Contact is ejected from the Journey.
         */
        console.log('debug: /execute');

        // example: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/example-rest-activity.htm
        const sendIdInArgument = req.body.inArguments[0]['sendId'];
        const suidInArgument = req.body.inArguments[0]['suid'];
        const coopInArgument = req.body.inArguments[0]['coop'];
        const accountInArgument = req.body.inArguments[0]['account'];
        const categoryInArgument = req.body.inArguments[0]['category'];
        const familyInArgument = req.body.inArguments[0]['family'];
        const eventDateInArgument = req.body.inArguments[0]['eventDate'];
        const idPartMktCloudInArgument = req.body.inArguments[0]['idPartMktCloud'];

        const payloadAxios = {
            "items": [{
                "sendId": sendIdInArgument,
                "suid": suidInArgument,
                "coop": coopInArgument,
                "account": accountInArgument,
                "category": categoryInArgument,
                "family": familyInArgument,
                "eventDate": eventDateInArgument,
                "idPartMktCloud": idPartMktCloudInArgument
            }]
        }

        console.log("Payload: " + JSON.stringify(req.body, null, 2));
        console.log("Header: " + JSON.stringify(req.headers, null, 2));

        const config = {
            headers: {
              'Authorization': 'Bearer iWw9Bd8ahpAXChc3KtbWz6vg'
            }
        }


        // Debug
        // axios.post('https://in.logs.betterstack.com',
        //     payloadAxios,
        //     config
        // ).then(res => {
        //     console.log(`statusCodeRequestBin: ${res.status}`)
        // }).catch(error => {
        //     console.error(error)
        // });

        // Insert Data to DE
        // axios.post(`${process.env.urlRest}data/v1/async/dataextensions/key:${process.env.deKey}/rows/`, payloadAxios)
        //     .then(res => {
        //         console.log(`statusCodeExecute: ${res.status}`)
        //         console.log(res.data)
        //     }).catch(error => {
        //         console.error(error)
        //     });
        return res.status(200).json({});
    });





    return {
        "status": "OK",
        "message": "Routes Generated"
    };
};

app = createApp();
console.log(generateRoutes(app));