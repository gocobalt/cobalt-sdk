# Cobalt NodeJS SDK

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
This Api creates a linked account. Linked accounts are the users for whos behalf you'd be calling the Cobalt APIs. The api expects ```linked_account_id``` as a mandatory field. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): String,
name (Optional): String,
udf (Optional): Record<String, Any>,
your_app (Optional): {
    app_id (Mandatory): String,
    auth_credentials (Mandatory): Record<String, Any>
}
```

 You can call the API like:

```Javascript
try{
    await Client.createLinkedAccount({
        linked_account_id:"<Account Id of the user eg: example@some_email.com>",
        name: "<Name for the account>",
        udf:{
            "<Key name 1>":"<Data 1>",
            "<Key name 2>":"<Data 2>",
            "<Key name 3>":"<Data 3>"
        },
        your_app:{
            app_id:"<Id of the app created in cobalt>",
            auth_credentials:{
                "<Header Key eg; x-api-key or Authorization>": "<Value eg; Value for x-api-key or Bearer Ejy245f3dd4d1.....>"
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

* **Upsert Linked Account** - ```upsertLinkedAccount```.
This Api creates a linked account or updates a Linked Account if it already exists. Linked accounts are the users for whos behalf you'd be calling the Cobalt APIs. The api expects ```linked_account_id``` as a mandatory field. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): String,
name (Optional): String,
udf (Optional): Record<String, Any>,
your_app (Optional): {
    app_id (Mandatory): String,
    auth_credentials (Mandatory): Record<String, Any>
}
```

 You can call the API like:

```Javascript
try{
    await Client.upsertLinkedAccount({
        linked_account_id:"<Account Id of the user eg: example@some_email.com>",
        name: "<Name for the account>",
        udf:{
            "<Key name 1>":"<Data 1>",
            "<Key name 2>":"<Data 2>",
            "<Key name 3>":"<Data 3>"
        },
        your_app:{
            app_id:"<Id of the app created in cobalt>",
            auth_credentials:{
                "<Header Key eg; x-api-key or Authorization>": "<Value eg; Value for x-api-key or Bearer Ejy245f3dd4d1.....>"
            }
        }
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.upsertLinkedAccount({
    linked_account_id:"<Linked account Id of the user eg: example@some_email.com>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get all linked accounts** - ```getAllLinkedAccounts```.
This API returns all linked accounts. Find below the list of parameters supported by the API:

```JavaScript
# First Argument
options (Optional): {
    page (Optional): number
    limit (Optional): number
}
```

You can call the API like:
```JavaScript
try{
    const data = await Client.getAllLinkedAccounts({
        page:5,
        limit:10
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.getAllLinkedAccounts({
    page:5,
    limit:10
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get a linked account** - ```getLinkedAccountById```.
This API returns a linked account by id. Find below the list of parameters supported by the API:

```JavaScript
# First Argument
linked_account_id (Mandatory): String
```

You can call the API like:
```JavaScript
try{
    const data = await Client.getLinkedAccountById("<linked_account_id>")
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.getLinkedAccountById("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Delete a linked account** - ```deleteLinkedAccount```.
This API deletes a linked account. Find below the list of parameters supported by the API:

```JavaScript
# First Argument
linked_account_id (Mandatory): String
```

You can call the API like:
```JavaScript
try{
    const data = await Client.deleteLinkedAccount("<linked_account_id>")
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.deleteLinkedAccount("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```


* **Migrate Auth Object for an application** - ```migrateAuth```.
This API is used to Migrate Auth Object (API keys, Access Tokens, etc;) of an application to an integration in Cobalt. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): String,
slug: String (Mandatory) - Application Slug,

auth_object: Record (Mandatory) - Object containing Tokens or Keys of application that needs to be migrated to Cobalt's existing integration of the same application. For example, auth_object for Gmail must consist either of access_token, refresh_token or both.
```

 You can call the API like:

```Javascript
try{
    await Client.migrateAuth({
        "linked_account_id":"<Account Id of the user eg: example@some_email.com>",
        "slug":"gmail",
        "auth_object":{
            "refresh_token":"<Some valid Refresh Token>"
        }
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.migrateAuth({
    "linked_account_id":"<Account Id of the user eg: example@some_email.com>",
    "slug":"gmail",
    "auth_object":{
        "refresh_token":"<Some valid Refresh Token>"
    }
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get Token For A Linked Account** - ```getTokenForLinkedAccount```.
TThis API provided a session token to authenticate a linked account.Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): String

```

You can call the API like:

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
```

You can call the API like:
```JavaScript

try{
    const data = await Client.getApplications("<linked_account_id>")
}catch(error){
    //Catch any error
}
```
OR

```JavaScript
Client.getApplications("<linked_account_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
```JavaScript
Client.getApplications("<linked_account_id>")
```


* **Get an application by slug for a linked account** - ```getApplicationBySlug```.
This API Returns Applications by "slug" for any Linked account. Find below the list of parameters supported by the API:

```
# First Argument
linked_account_id (Mandatory): String

# First Argument
slug (Mandatory): String
```

You can call the API like:
```JavaScript

try{
    const data = await Client.getApplicationBySlug("<linked_account_id>","<application slug eg: slack>")
}catch(error){
    //Catch any error
}
```
OR

```JavaScript
Client.getApplicationBySlug("<linked_account_id>","<application slug eg: slack>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get all executions for a linked account** - ```getExecutions```.
This API provides total executions for all workflows for a linked account. Find below the list of parameters supported by the API:

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
    const data = await Client.getExecutions("<linked_account_id>", {
        page:5,
        limit:10
    })
}catch(error){
    //Catch any error
}
```
OR

```JavaScript
Client.getExecutions("<linked_account_id>", {
        page:5,
        limit:10
    }).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```
Use pagination by passing ```page``` and ```limit``` as parameters. By default the API provides all the applications for the linked account.
```JavaScript
await Client.getExecutions("<linked_account_id>", {
    page:5,
    limit:10
})
```

* **Get execution by id for a linked account** - ```getExecutionById```.
This API provides an execution by id for a linked account. Find below the list of parameters supported by the API:

```JavaScript
# First Argument
linked_account_id (Mandatory): String

#Second Argument
execution_id (Mandatory): String
```

You can call the API like:
```JavaScript

try{
    const data = await Client.getExecutionById("<linked_account_id>","<execution_id>")
}catch(error){
    //Catch any error
}
```
OR

```JavaScript
Client.getExecutionById("<linked_account_id>","<execution_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Trigger a webhook event** - ```event```.
This Api triggers a webhook event created for your app. You first need to create the event on your Cobalt dashboard. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): string,
event (Mandatory): string,
config_id (Optional): string,
slug (Optional): string,
payload (Optional):Record<string, any>
```
>NOTE: Use ```slug``` parameter if you want to trigger only a specific application action with your trigger

```JavaScript
try{
    const data = await Client.event({
        linked_account_id:"<Account Id of the user eg: example@someemail.com>",
        event: "Event 1",
        config_id:"config-1",
        slug:"slack",
        payload: {
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
Client.event({
    linked_account_id:"<Account Id of the user eg: example@someemail.com>",
    event: "Event 1",
    config_id:"config-1",
    slug:"slack",
    payload: {
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

* **Update an event** - ```updateEvent```.
This API updates an event. Find below the list of parameters supported by the API:

```JavaScript
event_id (Mandatory): string,
name (Mandatory): string,
response (Mandatory): Record<string, any>,
```

```JavaScript
try{
    const data = await Client.updateEvent({
        event_id:"<Event Id of the event>",
        name: "Event 1",
        response: {
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
Client.updateEvent({
    event_id:"<Event Id of the event>",
    name: "Event 1",
    response: {
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

* **Delete an event** - ```deleteEvent```.
This API deletes an event. Find below the list of parameters supported by the API:

```JavaScript
event_id (Mandatory): string
```

```JavaScript
try{
    const data = await Client.deleteEvent({
        event_id:"<Event Id of the event>"
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.deleteEvent({
    event_id:"<Event Id of the event>"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **List events** - ```listEvents```.
This API lists all events. Find below the list of parameters supported by the API:

```JavaScript
# First Argument
options (Optional): {
    page (Optional): number
    limit (Optional): number
}
```

You can call the API like:
```JavaScript
try{
    const data = await Client.listEvents({
        page:5,
        limit:10
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.listEvents({
    page:5,
    limit:10
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **List event by id** - ```listEventById```.
This API lists an event by id. Find below the list of parameters supported by the API:

```JavaScript
# First Argument
event_id (Mandatory): string
```

You can call the API like:
```JavaScript
try{
    const data = await Client.listEventById("<event_id>")
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.listEventById("<event_id>").then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```



* **Get a config** - ```getConfig```.
This API gets a specified config. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): string,
slug (Mandatory): string,
config_id (Optional): string
```

```JavaScript
try{
    const data = await Client.getConfig({
        "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
        "slug": "Application slug eg: mailerlite",
        "config_id": "existing config id eg: config_1"
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.getConfig({
    "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
    "slug": "Application slug eg: mailerlite",
    "config_id": "existing config id eg: config_1"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```


* **Find or Create a config** - ```config```.
This API returns the specified config, or creates one if it doesn't exist. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): string,
slug (Mandatory): string,
config_id (Optional): string,
labels (Optional):Record<string, Record<string, string>[]>
```

```JavaScript
try{
    const data = await Client.config({
        "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
        "slug": "mailerlite",
        "config_id": "config_1",
        "labels": {
            "yourApp_fields": [
                {
                    "name": "Customer Name",
                    "value": "app_var_name"
                },
                {
                    "name": "Customer Last Name",
                    "value": "app_var_last_name"
                }
            ]
        }
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.config({
    "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
    "slug": "mailerlite",
    "config_id": "config_1",
    "labels": {
        "yourApp_fields": [
            {
                "name": "Customer Name",
                "value": "app_var_name"
            },
            {
                "name": "Customer Last Name",
                "value": "app_var_last_name"
            }
        ]
    }
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Update a config** - ```updateConfig```.
This API update the specified config. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): string,
slug (Mandatory): string,
config_id (Optional): string,
fields (Optional):Record<string, string|Record<string, string>>,
workflows (Optional):Array<{
    id: string,
    enabled: boolean,
    fields: Record<string, string|Record<string, string>>
  }>
```

```JavaScript
try{
    const data = await Client.updateConfig({
        "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
        "slug": "Application slug eg: mailerlite",
        "config_id": "existing config id eg: config_1",
        "fields": {
            "field_id eg:646473c7e7b74deee820458f":{
                "you_app_variable_1":"mapped value 1",
                "you_app_variable_2":"mapped value 2",
                ....
            },
            "field_id eg:646473c7e7b74deee820459a":"Value"
        },
        "workflows":[
            {
                "id":"Workflow Id eg: 649d230c2ce6b9b07b163e61",
                "enabled":true, // if enabling the workflow else false
                "fields": {
                    "field_id eg:646473c7e7b74deee820458f":{
                        "you_app_variable_1":"mapped value 1",
                        "you_app_variable_2":"mapped value 2",
                        ....
                    },
                    "field_id eg:646473c7e7b74deee820459a":"Value"
                },
            }
        ]
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.updateConfig({
    "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
    "slug": "Application slug eg: mailerlite",
    "config_id": "existing config id eg: config_1",
     "fields": {
        "field_id eg:646473c7e7b74deee820458f":{
            "you_app_variable_1":"mapped value 1",
            "you_app_variable_2":"mapped value 2",
            ....
        },
        "field_id eg:646473c7e7b74deee820459a":"Value"
    },
    "workflows":[
        {
            "id":"Workflow Id eg: 649d230c2ce6b9b07b163e61",
            "enabled":true, // if enabling the workflow else false
             "fields": {
                "field_id eg:646473c7e7b74deee820458f":{
                    "you_app_variable_1":"mapped value 1",
                    "you_app_variable_2":"mapped value 2",
                    ....
                },
                "field_id eg:646473c7e7b74deee820459a":"Value"
            },
        }
    ]
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Delete a config** - ```deleteConfig```.
This API deletes the specified config. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```
linked_account_id (Mandatory): string,
slug (Mandatory): string,
config_id (Optional): string
```

```JavaScript
try{
    const data = await Client.deleteConfig({
        "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
        "slug": "Application slug eg: mailerlite",
        "config_id": "existing config id eg: config_1"
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.deleteConfig({
    "linked_account_id":"<Account Id of the user eg: example@someemail.com>",
    "slug": "Application slug eg: mailerlite",
    "config_id": "existing config id eg: config_1"
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Get a webhook** - ```getWebhook```.
This API gets a specified webhook. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```JavaScript
try{
    const data = await Client.getWebhook();
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.getWebhook().then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Create a webhook** - ```createWebhook```.
This API creates a webhook. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```
webhook_url (Mandatory): string,
webhook_events (Mandatory): Array<string>
```

```JavaScript
try{
    const data = await Client.createWebhook({
        "webhook_url":"<Webhook URL>",
        "events":["event1","event2"]
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.createWebhook({
    "webhook_url":"<Webhook URL>",
    "events":["event1","event2"]
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Subscribe webhook events** - ```subscribeWebhookEvents```.
This API subscribes to webhook events. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```
webhook_events (Mandatory): Array<string>
```

```JavaScript
try{
    const data = await Client.subscribeWebhookEvents({
        "events":["event1","event2"]
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.subscribeWebhookEvents({
    "events":["event1","event2"]
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Unsubscribe webhook events** - ```unsubscribeWebhookEvents```.
This API unsubscribes to webhook events. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```
webhook_events (Mandatory): Array<string>
```

```JavaScript
try{
    const data = await Client.unsubscribeWebhookEvents({
        "events":["event1","event2"]
    })
}catch(error){
    //Catch any error
}
```

OR

```JavaScript
Client.unsubscribeWebhookEvents({
    "events":["event1","event2"]
}).then(data=>{
    console.log("data", data)
}).catch(e=>{
    console.log("error", e.message)
})
```

* **Execute a workflow** - ```executeWorkflow```.
This API executes a workflow. It requires x-api-key and linked_account_id as mandatory parameters. Find below the list of parameters supported by the API:

```
workflow_id/workflow_alias (Mandatory): string,
slug (Mandatory): string,
linked_acc (Mandatory): string,
sync_execution (Mandatory): boolean,
payload (Mandatory): Record<string, any>
```

```JavaScript
try{
    const data = await Client.executeWorkflow({
        "workflow_id":"<Workflow Id Or workflow alias>",
        "slug": "Application slug eg: mailerlite",
        "linked_acc": "linked_account_id",
        "sync_execution": true,
        "payload": {
            "<Key 1>": "<Value 1, Type: Any>",
            "<Key 2>": "<Value 2, Type: Any>",
            ...
        }
    })
}catch(error){
    //Catch any error
}
```

## Getting Help

The best way to interact with our team is through [GitHub](https://github.com/Breakout-Embed/cobalt-sdk "Cobalt SDK GitHub"). You can open an issue and choose from one of our templates for bug reports, feature requests or guidance.

## Contributing

We welcome community contributions and pull requests. For information on how to set up a development environment and submit code please visit https://www.gocobalt.io/privacy-policy.
