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
            label: 'Step 1',
            key: 'step1'
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


    function onRender() {
        
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        
        // Disable the done button if a value isn't selected
        $('#suid, #coop, #account, #category, #family, #idPartMktCloud').on('input', () => {
            let suid = $('#suid').val()
            let coop = $('#coop').val()
            let account = $('#account').val()
            let category = $('#category').val()
            let family = $('#family').val()
            let idPartMktCloud = $('#idPartMktCloud').val()
            connection.trigger('updateButton', {
                button: 'next',
                enabled: Boolean(suid&&coop&&account&&category&&family&&idPartMktCloud)
            });
        });

        // Optional
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestedCulture');
        connection.trigger('requestInteractionDefaults');
        connection.trigger('requestInteraction');
        connection.trigger('requestTriggerEventDefinition');
    }

    function initialize(data) {

        if (data) {
            payload = data;
        }

        let suid;
        let coop;
        let account;
        let category;
        let family;
        let idPartMktCloud;

        let hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        let inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        // console.log('-------- triggered:onInitActivity({obj}) --------');
        // console.log('activity:\n ', JSON.stringify(payload, null, 4));
        // console.log('Has In Arguments: ', hasInArguments);
        // console.log('inArguments', inArguments);
        // console.log('-------------------------------------------------');

        $.each(inArguments, (index, inArgument) => {
            $.each(inArgument, (key, val) => {
                if (key === 'suidField') {
                    suid = val;
                }
                else if (key === 'coopField') {
                    coop = val;
                }
                else if (key === 'accountField') {
                    account = val;
                }
                else if (key === 'category') {
                    category = val;
                }
                else if (key === 'family') {
                    family = val;
                }
                else if (key === 'idPartMktCloud') {
                    idPartMktCloud = val;
                }
            });
        });


        $('#suid').val(suid);
        $('#coop').val(coop);
        $('#account').val(account);
        $('#category').val(category);
        $('#family').val(family);
        $('#idPartMktCloud').val(idPartMktCloud);


        // If there is a message enable de next button
        connection.trigger('updateButton', {
            button: 'next',
            enabled: Boolean(idPartMktCloud)
        });
    }

    function onClickedNext() {
        save();
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
                    enabled: Boolean($('#idPartMktCloud').val())
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
        let suid = $('#suid').val();
        let coop = $('#coop').val();
        let account = $('#account').val();
        let category = $('#category').val();
        let family = $('#family').val();
        let idPartMktCloud = $('#idPartMktCloud').val();

        // 'payload' is initialized on 'initActivity' above.
        // Journey Builder sends an initial payload with defaults
        // set by this activity's config.json file.  Any property
        // may be overridden as desired.
        

        payload['arguments'].execute.inArguments[0].suid = `{{Event.${eventDefinitionKey}."${suid}"}}` //DE
        payload['arguments'].execute.inArguments[0].coop = `{{Event.${eventDefinitionKey}."${coop}"}}` //DE
        payload['arguments'].execute.inArguments[0].account = `{{Event.${eventDefinitionKey}."${account}"}}` //DE
        payload['arguments'].execute.inArguments[0].category = category
        payload['arguments'].execute.inArguments[0].family = family
        payload['arguments'].execute.inArguments[0].idPartMktCloud = idPartMktCloud //INPUT
        payload['arguments'].execute.inArguments[0].suidField = suid
        payload['arguments'].execute.inArguments[0].coopField = coop
        payload['arguments'].execute.inArguments[0].accountField = account

        //payload['arguments'].execute.inArguments[0].name = `{{Event.${eventDefinitionKey}."name"}}`

        payload['metaData'].isConfigured = true;

        // console.log('------------ triggering:updateActivity({obj}) ----------------');
        // console.log('Sending message back to updateActivity');
        // console.log('saving\n', JSON.stringify(payload, null, 4));
        // console.log('--------------------------------------------------------------');

        connection.trigger('updateActivity', payload);
    }

    function onGetTokens(tokens) {
        // console.log('tokens:\n', JSON.stringify(tokens, null, 4));
    }

    function onGetEndpoints(endpoints) {
        // console.log('endpoints:\n', JSON.stringify(endpoints, null, 4));
    }

    function onRequestedCulture(cultureCodeString) {
        // console.log('cultureCodeString:\n', JSON.stringify(cultureCodeString, null, 4));
    }

    function onRequestedInteractionDefaults(settings) {
        // console.log('settings:\n', JSON.stringify(settings, null, 4));
    }

    function oRequestedInteraction(interaction) {
        // console.log('interaction:\n', JSON.stringify(interaction, null, 4));
    }

    function onRequestedTriggerEventDefinition(eventDefinitionModel) {
        // console.log('eventDefinitionModel:\n', JSON.stringify(eventDefinitionModel, null, 4));
        eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
    }
});