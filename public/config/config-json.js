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
                }],
                outArguments: [],
                url: `${fullUrl}/execute`,
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
                url: `${fullUrl}/publish`,
                useJwt: false,
                securityOptions: {
                    securityType: 'securityContext',
                    securityContextKey: 'communication-stimulus-auth'
                }
            },
            save: {
                url: `${fullUrl}/save`,
                useJwt: false,
                securityOptions: {
                    securityType: 'securityContext',
                    securityContextKey: 'communication-stimulus-auth'
                }
            },
            stop: {
                url: `${fullUrl}/stop`,
                useJwt: false,
                securityOptions: {
                    securityType: 'securityContext',
                    securityContextKey: 'communication-stimulus-auth'
                }
            },
            validate: {
                url: `${fullUrl}/validate`,
                useJwt: false,
                securityOptions: {
                    securityType: 'securityContext',
                    securityContextKey: 'communication-stimulus-auth'
                }
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