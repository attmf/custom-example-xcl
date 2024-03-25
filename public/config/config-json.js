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
                name: 'mkt-cloud-stimulus',
                description: 'Estímulo no app Sicredi'
            }
        },
        arguments: {
            execute: {
                inArguments: [{
                    SubscriberKey: '{{Contact.Key}}'
                }],
                outArguments: [],
                url: 'https://enrvypa2duus0gi.m.pipedream.net',
                timeout: 10000,
                retryCount: 3,
                retryDelay: 1000,
                concurrentRequests: 5,
                useJwt: false,
                securityOptions: {
                    securityType: 'securityContext',
                    securityContextKey: 'communication-stimulus-auth'
                }
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
                label: 'Configurações',
                key: 'step1'
            }
        ],
        userInterfaces: {
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