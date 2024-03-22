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
        $('#idPartMktCloud').on('input', () => {
            // let message = $('#message').val()
            // let type = $('#message2').val()
            // let category = $('#category').val()
            let sendId = $('#sendId').val()
            let suid = $('#suid').val()
            let coop = $('#coop').val()
            let account = $('#account').val()
            let category = $('#category').val()
            let family = $('#family').val()
            let eventDate = $('#eventDate').val()
            let idPartMktCloud = $('#idPartMktCloud').val()
            connection.trigger('updateButton', {
                button: 'next',
                enabled: Boolean(sendId&&suid&&coop&&account&&category&&family&&eventDate&&idPartMktCloud)
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

        // let message;
        // let category;
        // let type;
        // let buttonTitle;
        let sendId;
        let suid;
        let coop;
        let account;
        let category;
        let family;
        let eventDate;
        let idPartMktCloud;

        let hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        let inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log('-------- triggered:onInitActivity({obj}) --------');
        console.log('activity:\n ', JSON.stringify(payload, null, 4));
        console.log('Has In Arguments: ', hasInArguments);
        console.log('inArguments', inArguments);
        console.log('-------------------------------------------------');

        $.each(inArguments, (index, inArgument) => {
            $.each(inArgument, (key, val) => {
                if (key === 'sendId') {
                    sendId = val;
                }
                else if (key === 'suid') {
                    suid = val;
                }
                else if (key === 'coop') {
                    coop = val;
                }
                else if (key === 'account') {
                    account = val;
                }
                else if (key === 'category') {
                    category = val;
                }
                else if (key === 'family') {
                    family = val;
                }
                else if (key === 'eventDate') {
                    eventDate = val;
                }
                else if (key === 'idPartMktCloud') {
                    idPartMktCloud = val;
                }
            });
        });


        $('#sendId').val(sendId);
        $('#suid').val(suid);
        $('#coop').val(coop);
        $('#account').val(account);
        $('#category').val(category);
        $('#family').val(family);
        $('#eventDate').val(eventDate);
        $('#idPartMktCloud').val(idPartMktCloud);

        // $('#message').val(message);
        // $('#message2').val(type);
        // $('#category').val(category);
        // $('#buttonTitle').val(buttonTitle.replace(/\{{[\s\S]*?\}}/g, ''));

        // If there is a message enable de next button
        connection.trigger('updateButton', {
            button: 'next',
            enabled: Boolean(message)
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
        // var message = $('#message').val();
        // var type = $('#message2').val();
        // var category = $('#category').val();
        // var buttonTitle = $('#buttonTitle').val();
        var buttonTitle = $('#buttonTitle').val();
        var sendId = $('#sendId').val();
        var suid = $('#suid').val();
        var coop = $('#coop').val();
        var account = $('#account').val();
        var category = $('#category').val();
        var family = $('#family').val();
        var eventDate = $('#eventDate').val();
        var idPartMktCloud = $('#idPartMktCloud').val();

        // 'payload' is initialized on 'initActivity' above.
        // Journey Builder sends an initial payload with defaults
        // set by this activity's config.json file.  Any property
        // may be overridden as desired.
        

        payload['arguments'].execute.inArguments[0].sendId = sendId
        payload['arguments'].execute.inArguments[0].suid = suid
        payload['arguments'].execute.inArguments[0].coop = coop
        payload['arguments'].execute.inArguments[0].account = account
        payload['arguments'].execute.inArguments[0].category = category
        payload['arguments'].execute.inArguments[0].family = family
        payload['arguments'].execute.inArguments[0].eventDate = eventDate
        payload['arguments'].execute.inArguments[0].idPartMktCloud = idPartMktCloud

        // payload['arguments'].execute.inArguments[0].message = message
        // payload['arguments'].execute.inArguments[0].type = type
        // payload['arguments'].execute.inArguments[0].category = category
        // payload['arguments'].execute.inArguments[0].buttonTitle = buttonTitle
        //payload['arguments'].execute.inArguments[0].name = `{{Event.${eventDefinitionKey}."name"}}`

        payload['metaData'].isConfigured = true;

        console.log('------------ triggering:updateActivity({obj}) ----------------');
        console.log('Sending message back to updateActivity');
        console.log('saving\n', JSON.stringify(payload, null, 4));
        console.log('--------------------------------------------------------------');

        connection.trigger('updateActivity', payload);
    }

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
});