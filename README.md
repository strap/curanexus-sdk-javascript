# Javascript > Strap Client SDK

Strap Client SDK provides an easy to use, tool for hooking Stap registration into existing websites.

### *JQuery is required for the Strap Javascript library.*

### Installation

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://s3.amazonaws.com/strap-libs/strap.min.js"></script>
```

### Initialization

Include the `strap.min.js` file and establish a reference to the Strap library..

```javascript
// Setup SDK, passing in the Read Token for the Project
var Strap = $.strap({token:"WRITE-TOKEN", guid: "USER-GUID"})
// token and guid required
```

### Basic Usage

Once strap has initialized, setup a handler for the "status" event

```javascript
Strap.on("status", function(data) {

  // Returns the user connection status
  if ( connected = Strap.status() ) {
    // Do something on the status change
    $("#myButton").text("Disconnect Device");
  } else {
    $("#myButton").text("Connect Device");
  }
})
```

### API

#### Connect

The connect method launches the connection window to guide the user thru connecting their device to your application.
```javascript
Strap.connect()
```

#### Disconnect

The disconnect method launches the connection window to remove the device from your application.
```javascript
Strap.disconnect()
```

#### Status

The status method returns true or false based on the users "connection" status based on the "guid" provided.
```javascript
Strap.status()
```

### Events

There are several events that can be subscribed to:

| **Name** | **Description** | 
| :--- | --- | ---: | ---: |
| cancel | The user has opened the window, but cancelled prior to connecting their device |
| connect | The user has connected their device |
| error | An error has occurred |
| status | The connection (connected or disconnected) status has changed for the user |

### Event Subscribe

Subscribing to the Strap events allows you to know when a user has tripped any of the events listed above.

```javascript
Strap.on("EVENT-NAME", function(data) {

    // Do something on the event

})
```

