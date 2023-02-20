# Cobalt SDK

With Cobalt you can Integrate workflows with your favourite cloud applications. Create processes and bring teams, tools, customers together so business can run on autopilot and more confidently—all on a single platform. 

_Visit **[gocobalt.io](https://www.gocobalt.io/ "Cobalt Home")** for more details_



## Getting Started

### How to install

The preferred way to install the Cobalt SDK for Node.js is to use the npm package manager. Simply type the following into a terminal window:

~~~
 npm i @cobaltio/cobalt
~~~

### Usage

The Cobalt SDK for JavaScript bundles TypeScript definition files for use in TypeScript projects. We aim to keep these TypeScript definition files updated with each release for any public api.

#### **Pre-requisites for Typescript**

* Use TypeScript v2.x
* If you are targeting at es5 or older ECMA standards, your tsconfig.json has to include 'es5' and 'es2015.promise' under compilerOptions.lib. See tsconfig.json for an example.
* Includes the TypeScript definitions for node. You can use npm to install this by typing the following into a terminal window:

    ~~~
    npm install --save-dev @types/node
    ~~~

To use the TypeScript definition files within a Node.js project, simply import Cobalt-sdk as you normally would.

**In a TypeScript file:**

```TypeScript
import Cobalt from '@cobaltio/cobalt';
```

>NOTE: You might need to add "esModuleInterop": true to compilerOptions of your tsconfig.json.


**In a JavaScript file:**
```JavaScript
const Cobalt = require('@cobaltio/cobalt');
```

### Initializing Cobalt Client
To use the Cobalt SDK you first need to Sign Up with getCobalt & get the API key from Dashboard.

_Visit **[gocobalt.io](https://www.gocobalt.io/ "Cobalt Home")** to get the API key now!_

Once you have you api key, you can initialize the Cobalt Client by:


TypeScript :
```TypeScript
import Cobalt from '@cobaltio/cobalt';

const Client:Cobalt = new Cobalt({
    apiKey:"<Your Api Key>"
});
```

JavaScript :
```JavaScript
const Cobalt = require('@cobaltio/cobalt');

const Client = new Cobalt({
    apiKey:"<Your Api Key>"
});
```

## Using Cobalt APIs

Once the Client has been initialized you can make use of Cobalt APIs for getting things done and running for your platform. Please find the detailed list and documentations of the Cobalt APIs at : **[https://gocobalt.io/developers](https://www.gocobalt.io/developers "Cobalt API Documentation")**

>NOTE: Cobalt APIs require API Key to be accessed. _Visit **[gocobalt.io](https://www.gocobalt.io "Cobalt Home")** to get the API key now!_


**Examples:**

* **Create Linked Account** - ```createLinkedAccount```.
This is probably the first api that you'd be using. This Api creates a Linked Account for the user for whos behalf you'd be calling the Cobalt APIs. The api expects ```linked_account_id``` as a mandatory field. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): String,
payload (Optional): {
    name (Optional): String,
    udf (Optional): Record<String, Any>,
    your_app (Optional): {
        app_id (Mandatory): String,
        auth_credentials (Mandatory): Record<String, Any>
    }
}
```

 You can call the API like: 

```Javascript
try{
    await Client.createLinkedAccount({
        linked_account_id:"<Account Id of the user eg: example@some_email.com>",
        payload:{
            name: "<Name for the account>",
            udf:{
                "<Key name 1>":"<Data 1>",
                "<Key name 2>":"<Data 2>",
                "<Key name 3>":"<Data 3>"
            },
            app:{
                app_id:"<Id of the app created in cobalt>",
                auth_credentials:{
                    "<Header Key eg; x-api-key or Authorization>": "<Value eg; Value for x-api-key or Bearer Ejy245f3dd4d1.....>"
                }
            }
        }
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.createLinkedAccount({
    linked_account_id:"<Linked account Id of the user eg: example@some_email.com>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get Token For A Linked Account** - ```getTokenForLinkedAccount```.
This is probably the first api that you'd be using. This Api creates a Linked Account for the user for whos behalf you'd be calling the Cobalt APIs. The api expects ```linked_account_id```. You can call the API like: 

```JavaScript
try{
    const data = await Client.getTokenForLinkedAccount({
        linked_account_id:"<Account Id of the user eg: example@someemail.com>"
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.getTokenForLinkedAccount({
    linked_account_id:"<Account Id of the user eg: example@someemail.com>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get All Applications for a linked account** - ```getApplications```. 
This API returns all available Cobalt Applications. The method expects a ```linked_account_id``` as the mandatory first argument. Find below the list of parameters supported by the API:

```
# First Argument
linked_account_id (Mandatory): String

#Second Argument
options (Optional): {
    page (Optional): number
    limit (Optional): number
}
```

You can call the API like: 
```JavaScript

try{
    const data = await Client.getApplications("<linked_account_id>", {
        page:5,
        limit:10,
    })
}catch(error){
    //Catch any error
}
Client.getApplications("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
OR

```JavaScript
Client.getApplications("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
Use pagination by passing ```page``` and ```limit``` as parameters. By default the API provides all the applications for the linked account.
```JavaScript
Client.getApplications("<linked_account_id>", {
    page:5,
    limit:10
})
```

* **Trigger a webhook event** - ```triggerWebhookEvent```.
This Api triggers a webhook event created for your app. You first need to create the event on your Cobalt dashboard. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): string,
trigger (Mandatory): string,
config_id (Optional): string,
data (Optional):Record<string, any>
``` 

```JavaScript
try{
    const data = await Client.triggerWebhookEvent({
        linked_account_id:"<Account Id of the user eg: example@someemail.com>",
        trigger: "Trigger 1",
        config_id: "<Config Id, can be found on your Cobalt Dashboard>",
        data: {
            "<Key 1>": "<Value 1, Type: Any>",
            "<Key 2>": "<Value 2, Type: Any>",
            ...
        }
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.triggerWebhookEvent({
    linked_account_id:"<Account Id of the user eg: example@someemail.com>",
    trigger: "Trigger 1",
    config_id: "<Config Id, can be found on your Cobalt Dashboard>",
    data: {
        "<Key 1>": "<Value 1, Type: Any>",
        "<Key 2>": "<Value 2, Type: Any>",
        ...
    }
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

## Getting Help

The best way to interact with our team is through [GitHub](https://github.com/Breakout-Embed/cobalt-sdk "Cobalt SDK GitHub"). You can open an issue and choose from one of our templates for bug reports, feature requests or guidance.

## Contributing

We welcome community contributions and pull requests. For information on how to set up a development environment and submit code please visit https://www.gocobalt.io/privacy-policy.
