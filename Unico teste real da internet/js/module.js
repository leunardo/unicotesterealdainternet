var app = angular.module('testeInternet', ['ngRoute']);

app.constant('URL', 'http://localhost:3000');

alertify.defaults = {
        // dialogs defaults
        autoReset:true,
        basic:false,
        closable:true,
        closableByDimmer:true,
        frameless:false,
        maintainFocus:true, // <== global default not per instance, applies to all dialogs
        maximizable:true,
        modal:true,
        movable:true,
        moveBounded:true,
        overflow:true,
        padding: true,
        pinnable:true,
        pinned:true,
        preventBodyShift:false, // <== global default not per instance, applies to all dialogs
        resizable:true,
        startMaximized:false,
        transition:'pulse',

        // notifier defaults
        notifier:{
            // auto-dismiss wait time (in seconds)  
            delay:5,
            // default position
            position:'bottom-right',
            // adds a close button to notifier messages
            closeButton: true
        },

        // language resources 
        glossary:{
            // dialogs default title
            title:'ALERTOP2000',
            // ok button text
            ok: 'Ok!',
            // cancel button text
            cancel: 'Cancelar'            
        },

        // theme settings
        theme:{
            // class name attached to prompt dialog input textbox.
            input:'ajs-input',
            // class name attached to ok button
            ok:'ajs-ok',
            // class name attached to cancel button 
            cancel:'ajs-cancel'
        }
    };