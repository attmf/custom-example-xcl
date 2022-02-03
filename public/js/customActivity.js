require([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';
    const connection = new Postmonger.Session();
    var payload = {};

    let eventDefinitionKey;
    var steps = [{
            label: 'Example Step 1',
            key: 'step1'
        },
        {
            label: 'Example Step 2',
            key: 'step2'
        }
    ];
    var currentStep = steps[0].key;

    connection.on('initActivity', initialize);
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    $(window).ready(onRender);

    // Optional
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedCulture', onRequestedCulture);
    connection.on('requestedInteractionDefaults', onRequestedInteractionDefaults);
    connection.on('requestedInteraction', oRequestedInteraction);
    connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition);
    // Unofficial
    connection.on('requestedSchema', onRequestedSchema);
    connection.on('requestedDataSources', onRequestedDataSources);
    connection.on('requestedInteractionGoalStats', onRequestedInteractionGoalStats);
    connection.on('requestedActivityPermissions', onRequestedActivityPermissions);
    connection.on('requestedEngineSettings', onRequestedEngineSettings);
    connection.on('requestedContactsSchema', onRequestedContactsSchema);
    connection.on('requestedExpressionBuilderAttributes', onRequestedExpressionBuilderAttributes);
    connection.on('requestedEntryEventDefinitionKey', onRequestedEntryEventDefinitionKey);
    connection.on('requestedI18nConfig', onRequestedI18nConfig);


    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        // Disable the done button if a value isn't selected
        $('#message').on('input', () => {
            let message = $('#message').val();
            connection.trigger('updateButton', {
                button: 'next',
                enabled: Boolean(message)
            });
        });



        // Optional
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestedCulture');
        connection.trigger('requestInteractionDefaults');
        connection.trigger('requestInteraction');
        connection.trigger('requestTriggerEventDefinition');
        // Unofficial
        connection.trigger('requestSchema');
        connection.trigger('requestDataSources');
        connection.trigger('requestInteractionGoalStats');
        connection.trigger('requestActivityPermissions');
        connection.trigger('requestEngineSettings');
        connection.trigger('requestContactsSchema');
        connection.trigger('requestExpressionBuilderAttributes');
        connection.trigger('requestEntryEventDefinitionKey');
        connection.trigger('requestI18nConfig');
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        let message;
        let sobrenome;

        let hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        let inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
        console.log('activity:\n ', JSON.stringify(payload, null, 4));

        $.each(inArguments, (index, inArgument) => {
            $.each(inArgument, (key, val) => {
                if (key === 'message') {
                    message = val;
                }
                if (key === 'sobrenome') {
                    sobrenome = val;
                }
            });
        });

        $('#message').val(message);

        // If there is a message enable de next button
        connection.trigger('updateButton', {
            button: 'next',
            enabled: Boolean(message)
        });
    }

    function onClickedNext() {
        if (currentStep.key === 'step2') {
            save();
        } else {
            connection.trigger('nextStep');
        }
    }

    function onClickedBack() {
        connection.trigger('prevStep');
    }

    function onGotoStep(step) {
        showStep(step);
        connection.trigger('ready');
    }

    function showStep(step, stepIndex) {
        if (stepIndex && !step) {
            step = steps[stepIndex - 1];
        }

        currentStep = step;

        $('.step').hide();

        switch (currentStep.key) {
            case 'step1':
                $('#step1').show();
                connection.trigger('updateButton', {
                    button: 'next',
                    enabled: Boolean($('#message').val())
                });
                connection.trigger('updateButton', {
                    button: 'back',
                    visible: false
                });
                break;
            case 'step2':
                $('#step2').show();
                connection.trigger('updateButton', {
                    button: 'back',
                    visible: true
                });
                connection.trigger('updateButton', {
                    button: 'next',
                    text: 'done',
                    visible: true,
                    enabled: true
                });
                break;
        }
    }

    function save() {
        var message = $('#message').val();
        var name = $('#name').val();

        // 'payload' is initialized on 'initActivity' above.
        // Journey Builder sends an initial payload with defaults
        // set by this activity's config.json file.  Any property
        // may be overridden as desired.
        payload['arguments'].execute.inArguments[0].message = message
        payload['arguments'].execute.inArguments[0].name = name
        // eventDefinitionKey is set in onRequestedTriggerEventDefinition()


        payload['metaData'].isConfigured = true;
        console.log('saving\n', JSON.stringify(payload, null, 4));

        connection.trigger('updateActivity', payload);
    }



    // Optional
    function onGetTokens(tokens) {
        console.log('tokens:\n', JSON.stringify(tokens, null, 4));
    }

    function onGetEndpoints(endpoints) {
        console.log('endpoints:\n', JSON.stringify(endpoints, null, 4));
    }

    function onRequestedCulture(cultureCodeString) {
        console.log('cultureCodeString:\n', JSON.stringify(cultureCodeString, null, 4));
    }

    function onRequestedInteractionDefaults(settings) {
        console.log('settings:\n', JSON.stringify(settings, null, 4));
    }

    function oRequestedInteraction(interaction) {
        console.log('interaction:\n', JSON.stringify(interaction, null, 4));
    }

    function onRequestedTriggerEventDefinition(eventDefinitionModel) {
        console.log('eventDefinitionModel:\n', JSON.stringify(eventDefinitionModel, null, 4));
        eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
    }

    // Unofficial
    function onRequestedSchema(schema) {
        console.log('schema:\n', JSON.stringify(schema, null, 4));
    }

    function onRequestedDataSources(dataSources) {
        console.log('dataSources:\n', JSON.stringify(dataSources, null, 4));
    }

    function onRequestedInteractionGoalStats(interactionGoalStats) {
        console.log('interactionGoalStats:\n', JSON.stringify(interactionGoalStats, null, 4));
    }

    function onRequestedActivityPermissions(activityPermissions) {
        console.log('activityPermissions:\n', JSON.stringify(activityPermissions, null, 4));
    }

    function onRequestedEngineSettings(engineSettings) {
        console.log('engineSettings:\n', JSON.stringify(engineSettings, null, 4));
    }

    function onRequestedContactsSchema(contactsSchema) {
        console.log('contactsSchema:\n', JSON.stringify(contactsSchema, null, 4));
    }

    function onRequestedExpressionBuilderAttributes(expressionBuilderAttributes) {
        console.log('expressionBuilderAttributes:\n', JSON.stringify(expressionBuilderAttributes, null, 4));
    }

    function onRequestedEntryEventDefinitionKey(entryEventDefinitionKey) {
        console.log('entryEventDefinitionKey:\n', JSON.stringify(entryEventDefinitionKey, null, 4));
    }

    function onRequestedI18nConfig(i18nConfig) {
        console.log('i18nConfig:\n', JSON.stringify(i18nConfig, null, 4));
    }

});