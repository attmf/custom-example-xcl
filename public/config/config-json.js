module.exports = function configJSON(req) {
    fullUrl = `https://${req.get('host')}${req.originalUrl.split('/').slice(0, -1).join('/')}`

    return {
        workflowApiVersion: '1.1',
        metaData: {
            icon: 'images/icon.png',
            category: 'Custom'
        },
        type: 'REST',
        lang: {
            'en-US': {
                name: 'Example of a Custom Activity 2',
                description: 'Custom Activity used only as an Example, it will read an write records in Data Extensions'
            }
        },
        arguments: {
            execute: {
                inArguments: [{
                    SubscriberKey: '{{Contact.Key}}'
                }],
                outArguments: [],
                url: `${fullUrl}/execute`,
                timeout: 10000,
                retryCount: 3,
                retryDelay: 1000,
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