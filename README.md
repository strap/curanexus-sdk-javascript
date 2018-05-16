# Javascript > curaNEXUS Client SDK

curaNEXUS Client SDK provides an easy to use, tool for hooking curaNEXUS registration into existing websites.

### *JQuery is required for the curaNEXUS Javascript library.*

### Installation

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//du4hmvufyj5o.cloudfront.net/curanexus.min.js"></script>
```

### Initialization

Include the `curanexus.min.js` file and establish a reference to the curaNEXUS library..

```javascript
// Setup SDK, passing in the Write Token for the Project
var curaNEXUS = $.curanexus({token:"WRITE-TOKEN", guid: "USER-GUID"})
// token is required
// guid is optional
```
NOTE: passing in the guid at start will perform an auto-validation and will trigger the "status" event on compeletion

### Basic Usage

Once curaNEXUS has initialized, setup a handler for the "status" event

```javascript
curaNEXUS.on("status", function(data) {

  // Returns the user connection status
  if ( connected = curaNEXUS.status() ) {
    // Do something on the status change
    $("#myButton").text("Disconnect Device");
  } else {
    $("#myButton").text("Connect Device");
  }
  // data will be an object
  // e.g. {connected: true/false, platform: "platform-string"}
  console.log("Status", data); 
})
```

### API

#### Connect

The connect method launches the connection window to guide the user thru connecting their device to your application.
```javascript
curaNEXUS.connect() // guid needs to be set in initialization or setGuid()
OR
curaNEXUS.connect("some-guid") // Passing in the guid value when initiating connection 
```

#### Disconnect

The disconnect method launches the connection window to remove the device from your application.
```javascript
curaNEXUS.disconnect() // guid needs to be set in previously
OR
curaNEXUS.disconnect("some-guid") // Passing in the guid value when initiating connection
```

#### Platform

The platform method returns a string reference to the platform of the user
```javascript
curaNEXUS.platform()
```

#### Set GUID

The setGuid method allows for the GUID value to be set or updated.
```javascript
curaNEXUS.setGuid("some-guid")
```

#### Status

The status method returns true or false based on the users "connection" status based on the "guid" provided.
```javascript
curaNEXUS.status()
```

#### Validate Check

The validate method allows for checking the connection status of a GUID.  Will trigger the "status" event.
```javascript
curaNEXUS.validate() // guid needs to be set previously
OR
curaNEXUS.validate("some-guid") // Passing in the guid value to check status
```

### Events

There are several events that can be subscribed to.

| **Name** | **Description** | 
| :--- | :--- |
| cancel | The user has opened the window, but cancelled prior to connecting their device |
| connect | The user has connected their device |
| error | An error has occurred |
| status | The connection (connected or disconnected) status has changed for the user |

### Event Subscribe

Subscribing to the curaNEXUS events allows you to know when a user has tripped any of the events listed above.

```javascript
curaNEXUS.on("EVENT-NAME", function(data) {

    // Do something on the event

})
```

