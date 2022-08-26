# Breakout SDK

With Breakout you can Integrate workflows with your favourite cloud applications. Create processes and bring teams, tools, customers together so business can run on autopilot and more confidently—all on a single platform. 

_Visit **[getbreakout.com](https://www.getbreakout.com "Breakout Home")** for more details_



## Getting Started

### How to install

The preferred way to install the Breakout SDK for Node.js is to use the npm package manager. Simply type the following into a terminal window:

~~~
 npm i breakout-sdk 
~~~

### Usage

The Breakout SDK for JavaScript bundles TypeScript definition files for use in TypeScript projects. We aim to keep these TypeScript definition files updated with each release for any public api.

#### **Pre-requisites for Typescript**

* Use TypeScript v2.x
* If you are targeting at es5 or older ECMA standards, your tsconfig.json has to include 'es5' and 'es2015.promise' under compilerOptions.lib. See tsconfig.json for an example.
* Includes the TypeScript definitions for node. You can use npm to install this by typing the following into a terminal window:

    ~~~
    npm install --save-dev @types/node
    ~~~

To use the TypeScript definition files within a Node.js project, simply import breakout-sdk as you normally would.

**In a TypeScript file:**

```TypeScript
import Breakout from 'breakout-sdk';
```

>NOTE: You might need to add "esModuleInterop": true to compilerOptions of your tsconfig.json.


**In a JavaScript file:**
```JavaScript
const Breakout = require('breakout-sdk');
```

### Initializing Breakout Client
To use the Breakout SDK you first need to Sign Up with getbreakout & get the API key from Dashboard.

_Visit **[getbreakout.com](https://www.getbreakout.com "Breakout Home")** to get the API key now!_

Once you have you api key, you can initialize the Breakout Client by:


TypeScript :
```TypeScript
import Breakout from 'breakout-sdk';

const Client:Breakout = new Breakout({
    apiKey:"<Your Api Key>"
});
```

JavaScript :
```JavaScript
const Breakout = require('breakout-sdk');

const Client = new Breakout({
    apiKey:"<Your Api Key>"
});
```

## Using Breakout APIs

Once the Client has been initialized you can make use of Breakout APIs for getting things done and running for your platform. Please find the detailed list and documentations of the Breakout APIs at : **[https://getbreakout.com/developers](https://www.getbreakout.com/developers "Breakout API Documentation")**

>NOTE: Breakout APIs require API Key to be accessed. _Visit **[getbreakout.com](https://www.getbreakout.com "Breakout Home")** to get the API key now!_


**Examples:**

* **Create Linked Account** - createLinkedAccount
This is probably the first api that you'd be using. This Api creates a Linked Account for the user for whos behalf you'd be calling the Breakout APIs. The api expects ```account_id``` & ```embed_id```. You can call the API like: 

```JavaScript
Client.createLinkedAccount({
    account_id:"<Account Id of the user eg: example@someemail.com>",
    embed_id:"<Embed ID assigned to the user>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get Token For A Linked Account** - getTokenForLinkedAccount
This is probably the first api that you'd be using. This Api creates a Linked Account for the user for whos behalf you'd be calling the Breakout APIs. The api expects ```linked_account_id``` & ```template_id```. You can call the API like: 

```JavaScript
Client.getTokenForLinkedAccount({
    linked_account_id:"<Account Id of the user eg: example@someemail.com>",
    template_id:"<Id of required template>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get All Published Templates** - getAllTemplates
This API returns all published Breakout Templates. The method expects a ```linked_account_id``` as the mandatory first argument. You can call the API like: 
```JavaScript
Client.getAllTemplates("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
Use pagination by passing ```page``` and ```limit``` as parameters;
```JavaScript
Client.getAllTemplates("<linked_account_id>", {
    page:5,
    limit:10
})
```


* **Get All Workflows** - getAllWorkflows
This API returns all available Breakout Workflows. The method expects a ```linked_account_id``` as the mandatory first argument. You can call the API like: 
```JavaScript
Client.getWorkflows("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
Use pagination by passing ```page``` and ```limit``` as parameters;
```JavaScript
Client.getWorkflows("<linked_account_id>", {
    page:5,
    limit:10
})
```

* **Install a Templates** - installTemplate
This API Installs a Workflow Template for the user. You can call the API like:
```JavaScript
Client.installTemplate({
    template_id:"<Template Id>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

## Using Async Await 

Breakout APis can be called using popular Async Await method too:

```JavaScript
await Client.createLinkedAccount({
    account_id:"<Account Id of the user eg: example@someemail.com>",
    embed_id:"<Embed Id assigned to the user>"
})
```

Using Try Catch Block: 

```JavaScript
try{
    const data = await Client.createLinkedAccount({
                    account_id:"<Account Id of the user eg: example@someemail.com>",
                    embed_id:"<Embed ID assigned to the user>"
                })
    console.log(data) // {...data in json format}
}catch(error){
    console.log(error.message)
}
```

## Getting Help

The best way to interact with our team is through [GitHub](https://github.com/Breakout-Embed/breakout-sdk "Breakout SDK GitHub"). You can open an issue and choose from one of our templates for bug reports, feature requests or guidance.

## Contributing

We welcome community contributions and pull requests. For information on how to set up a development environment and submit code please visit https://www.getbreakout.com/developers/community/help.
