module.exports = function configJSON(req) {
    fullUrl = `https://${req.get('host')}${req.originalUrl.split('/').slice(0, -1).join('/')}`

    return {
        workflowApiVersion: '1.1',
        metaData: {
            // the location of our icon file
            icon: 'images/icon.png',
            category: 'Custom'
        },
        // For Custom Activity this must say, "REST"
        type: 'REST',
        lang: {
            'en-US': {
                name: 'Example of a Custom Activity',
                description: 'Custom Activity used only as an Example, it will read an write records in Data Extensions'
            }
        },
        arguments: {
            execute: {
                // See: https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/how-data-binding-works.htm
                inArguments: [{
                    email: '{{InteractionDefaults.Email}}',
                    message: '',
                    SubscriberKey: '{{Contact.Key}}',
                    numberID: '{{Contact.Attribute."DE_Raphael_Teste_Custom_Consultar"."numberID"}}', // Get contact data: {{Contact.Attribute."DE_Name_Synced_At_Data_Design"."DE_Field"}}
                    name: ''
                }],
                outArguments: [],
                // Executes API call when contact passes through the Custom Activity step
                url: `${fullUrl}/execute`,
                // The amount of time we want Journey Builder to wait before cancel the request. Default is 60000, Minimal is 1000
                timeout: 10000,
                // how many retrys if the request failed with 5xx error or network error. default is 0
                retryCount: 3,
                // wait in ms between retry.
                retryDelay: 1000,
                // The number of concurrent requests Journey Builder will send all together
                concurrentRequests: 5
            }
        },
        configurationArguments: {
            publish: {
                url: `${fullUrl}/publish`
            },
            save: {
                url: `${fullUrl}/save`
            },
            stop: {
                url: `${fullUrl}/stop`
            },
            validate: {
                url: `${fullUrl}/validate`
            },
        },
        // Optional, sets the Custom Activity's step(s) when you're configuring it
        wizardSteps: [{
                label: 'Example Step 1',
                key: 'step1'
            },
            {
                label: 'Example Step 2',
                key: 'step2'
            }
        ],
        userInterfaces: {
            configurationSupportsReadOnlyMode: true,
            // Opens a lateral window as in any Journey Activiy
            configInspector: {
                size: 'medium',
                emptyIframe: false
            },

            // Opens a pop-up windown
            // configModal: {
            //     maxHeight: 600,
            //     maxWidth: 900,
            //     minHeight: 300,
            //     minWidth: 500
            // }
        },
        schema: {
            arguments: {
                execute: {
                    inArguments: [],
                    outArguments: []
                }
            }
        }
    };
};