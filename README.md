# px-inbox [![Build Status](https://travis-ci.org/PredixDev/px-inbox.svg?branch=master)](https://travis-ci.org/PredixDev/px-inbox)

## Overview

The px-inbox component provides a list/detail or “Inbox” view. This type of view is appropriate when a user has a list of items, with detailed information or actions associated with each item, e.g. alerts associated with a fleet of assets, or open cases in a field service engineer’s queue. It allows the user to switch back and forth between items without losing the higher level overview, or having to navigate back and forth between screens repeatedly.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-inbox --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-inbox/px-inbox.html"/>
```

Finally, use the component in your application:

```
<px-inbox list-items='[{"id":"1","title":"GT Vibration","subtitle":"Block 2","severity":"important","info":"1:29 PM"}]'>
  // define or bind to your detail view here
</px-inbox>
```

<br />
<hr />

## Documentation

Read the full API and view the demo [here](https://predixdev.github.io/predix-ui/?type=component&show=px-inbox/).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-inbox/issues) to submit any bugs you might find.
