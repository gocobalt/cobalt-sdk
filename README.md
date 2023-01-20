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
This is probably the first api that you'd be using. This Api creates a Linked Account for the user for whos behalf you'd be calling the Cobalt APIs. The api expects ```linked_account_id```. You can call the API like: 

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
Client.getTokenForLinkedAccount({
    linked_account_id:"<Account Id of the user eg: example@someemail.com>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```


* **Update App Credentials for a Linked Account** - ```updateAuthCredentials```.
This Api can be used if you do not want your users to authenticate while Configuring your cobalt app on your platform. This Api saves users' auth credentials required to access your platforms apis on behalf of your users. Call this API whenever you are generating new auth credentials for your user. The api expects ```linked_account_id```, ```app_id``` & ```auth_credentials```. You can call the API like: 

```JavaScript
Client.updateAuthCredentials("< app_id >", {
    linked_account_id:"<Account Id of the user eg: example@someemail.com>",
    auth_credentials: {
        //example - Bearer Tokens
        "Authorization": "Bearer <Some Token>"
    }
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get All Published Templates** - ```getAllPublishedTemplates```.
This API returns all published Cobalt Templates. You can call the API like: 
```JavaScript
Client.getAllPublishedTemplates().then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

If you want to get templates consisting a particular application, you can specify the ```associated_app_id``` as a parameter.
```JavaScript
Client.getAllPublishedTemplates({
    associated_app_id: "<application id>"
})
```

Use pagination by passing ```page``` and ```limit``` as parameters;
```JavaScript
Client.getAllPublishedTemplates({
    page:5,
    limit:10
})
```

* **Get All Templates for connected applications of a Linked Account** - ```getTemplatesForConnectedApps```.
This API returns all published Cobalt Templates. The method expects a ```linked_account_id``` as the mandatory first argument. You can call the API like: 
```JavaScript
Client.getTemplatesForConnectedApps("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
Use pagination by passing ```page``` and ```limit``` as parameters;
```JavaScript
Client.getTemplatesForConnectedApps("<linked_account_id>", {
    page:5,
    limit:10
})
```


* **Get All Workflows** - ```getAllWorkflows```. 
This API returns all available Cobalt Workflows. The method expects a ```linked_account_id``` as the mandatory first argument. You can call the API like: 
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
You may pass additional query such as ```udf``` as a parameter;
```Javascript
Client.getWorkflows("<linked_account_id>", {
    page:5,
    limit:10,
    udf:{
        id1: "EVENTID-1"
    }
})
```

* **Get All Applications for a linked account** - ```getApplications```. 
This API returns all available Cobalt Applications. The method expects a ```linked_account_id``` as the mandatory first argument. You can call the API like: 
```JavaScript
Client.getApplications("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
Use pagination by passing ```page``` and ```limit``` as parameters. By default the API provides all the applications for the linked account. However, if you want to get just the published applications, pass the ```for_published_template``` parameter as true in the options.
```JavaScript
Client.getApplications("<linked_account_id>", {
    page:5,
    limit:10,
    for_published_template:true
})
```

* **Delete a Workflow** - ```getAllWorkflows```. 
This API Deletes a Cobalt Workflow. The method expects a ```workflow_id``` as the mandatory first argument. You can call the API like: 
```JavaScript
Client.deleteWorkflow("<workflow_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```


## Using Async Await 

Cobalt APis can be called using popular Async Await method too:

```JavaScript
await Client.createLinkedAccount({
    linked_account_id:"<Account Id of the user eg: example@some_email.com>"
})
```

Using Try Catch Block: 

```JavaScript
try{
    const data = await Client.createLinkedAccount({
                    linked_account_id:"<Account Id of the user eg: example@some_email.com>"
                })
    console.log(data) // {...data in json format}
}catch(error){
    console.log(error.message)
}
```

## Getting Help

The best way to interact with our team is through [GitHub](https://github.com/Breakout-Embed/cobalt-sdk "Cobalt SDK GitHub"). You can open an issue and choose from one of our templates for bug reports, feature requests or guidance.

## Contributing

We welcome community contributions and pull requests. For information on how to set up a development environment and submit code please visit https://www.gocobalt.io/privacy-policy.
