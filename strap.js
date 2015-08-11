/**
 * Entry point into strap
 *
 * (C) Strap LLC 2015
 */
;(function ( $, window, document, undefined ) {

    "use strict";
        var url = 'https://api2.straphq.com';
        // Create the config
        var config = {
                token: "",
                guid: "",
                debug: false,
            };

        // Strap constructor
        function Strap ( options ) {
            this._config = config;             
            this._window = false;
            this._poller = false;
            this._winOpen = false;
            this._isConnected = false;
            this._platform = "";
            this._setConfig(options);
            this.init();
        }

        // Strap.prototype'ing
        $.extend(Strap.prototype, {
                init: function () {
                    if(this._config.guid) this._validate()
                },
                status: function() {
                    // Getter for user status
                    return this._isConnected;
                },
                platform: function() {
                    // Getter for user platform
                    return this._platform;
                },
                connect: function (guid) {
                    // Check for guid
                    if ( guid ) this.setGuid( guid );
                    
                    // Validate the information
                    if ( this._checkData() ) {
                        this._window = window.open( this._buildURL("connect"), "Strap", "width=380,height=500,scrollbars=yes");

                        // Start Polling
                        this._poll()
                        // Monitor the Window
                        this._winChecker();
                    }
                },
                disconnect: function (guid) {
                    // Check for guid
                    if ( guid ) this.setGuid( guid );
                    
                    // Validate the information
                    if ( this._checkData() ) {
                        this._window = window.open( this._buildURL("disconnect"), "Strap", "width=380,height=500,scrollbars=yes");

                        // Swap up the validation
                        setTimeout( this._validate.bind(this), 2000)
                    }
                },
                validate: function(guid) {
                    // Check guid for validation status
                    if ( guid ) this.setGuid( guid );
                    this._validate();
                },
                setGuid: function(guid) {
                    if ( guid ) {
                        this._setConfig( {guid: guid} );
                    } else {
                        this._onError("Missing Guid ")
                    }
                },
                log: function() { 
                    if ( this._config.debug ) { 
                        var args = Array.slice(arguments);
                        console.log(args); 
                    } 
                },
                on: function(name, func) {
                    // Handle subscribers to events
                    switch(name) {
                        case "cancel":
                            this._onCancel  = ( func ) ? func : this._onCancel;
                        break;
                        case "connect":
                            this._onConnect = ( func ) ? func : this._onConnect;
                        break;
                        case "error":
                            this._onError   = ( func ) ? func : this._onError;
                        break;
                        case "status":
                            this._onStatus  = ( func ) ? func : this._onStatus;
                        break;
                        
                    }
                },
                _validate: function() {
                    if ( this._checkData() ) {
                        $.getJSON( this._buildURL("check"), this._validator.bind(this) )
                    }
                },
                _validator: function(data) {
                    this._isConnected = (data.success || false)
                    this._platform = (data.platform || "")
                    this._onStatus({connect: this._isConnected, platform: this._platform})
                },
                _poll: function() {
                    this.log("Poll")
                    $.getJSON( this._buildURL("check"), this._pollResponse.bind(this) )
                },
                _pollResponse: function(data) {
                    this._isConnected = (data.success || false)
                    this._platform = (data.platform || "")
                    if ( !this._isConnected ) {
                        this.log("Poll Again")
                        this._poller = setTimeout( this._poll.bind(this), 3000 );
                    } else {
                        this.log("Poll Done")
                        if( this._isConnected ) this._onConnect();
                        this._onStatus({connect: this._isConnected, platform: this._platform})
                        this._stopPoller();
                    }
                },
                _stopPoller: function() {
                    this.log("Poll Killed")
                    clearTimeout( this._poller )
                },
                _winChecker: function() {
                    // Is the window Closed
                    if( this._window == null || this._window.closed ) {
                        this.log("Check Window: Closed")
                        if( this._poller && !this._isConnected ) this._onCancel();
                        this._stopPoller()
                        clearTimeout( this._winOpen )
                    } else {
                        this.log("Check Window: Open")
                        // It is open check again
                        this._winOpen = setTimeout( this._winChecker.bind(this), 1000 );
                    }
                },
                _onCancel:  function(m, cb) { this.log("Cancel", m);  },
                _onConnect: function(m, cb) { this.log("Connect", m); },
                _onError:   function(m, cb) { this.log("Error", m);   },
                _onStatus:  function(m, cb) { this.log("Status", m);   },
                _checkData: function() {
                    if (!this._config.token) {
                        this._onError("Missing token")
                        return false;
                    }

                    if (!this._config.guid) {
                        this._onError("Missing guid")
                        return false;
                    }
                    return true;
                },
                _setConfig: function(options) {
                    this._config = $.extend( {}, this._config, options )
                },
                _Close: function() {
                    this._window.close()
                },
                _buildURL: function(value) {
                    return url+"/"+value+"?token="+this._config.token+'&guid='+escape(this._config.guid)
                }
        });

        // Hook it into jQuery
        $[ "strap" ] = function ( options ) {
                return new Strap( options );
        };

})( jQuery, window, document );