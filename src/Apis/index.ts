import { Base } from "../base";
import { LinkedAccount, Templates, Workflows, createLinkedAccountPayload,
         getTokenForLinkedAccountPayload, getTokenForLinkedAccountResponse,
         templateObj, paginationOptions, updateAuthCredentialsPayload, getApplicationsOptions,
         getAllPublishedTemplatesOptions, getTemplatesForConnectedAppsOptions, getWorkflowsOptions,
         webhookTriggerPayload, migrateAuthPayload, findOrCreateConfig, updateConfigPayload, deleteConfigPayload, createWebhookPayload, subscribeWebhookPayload, unsubscribeWebhookPayload, updateEventPayload, GetLinkedAccount, GetAllLinkedAccounts, SuccessResponse, ErrorResponse, GetExecutions, Webhook, Events } from "./types";

export class Apis extends Base {
  createLinkedAccount(createLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/api/v2/public/linked-account`,{
      method: "POST",
      body: JSON.stringify(createLinkedAccountPayload),
    });
  }

  upsertLinkedAccount(upsertLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/api/v2/public/linked-account`,{
      method: "PUT",
      body: JSON.stringify(upsertLinkedAccountPayload),
    });
  }

  getAllLinkedAccounts(options?: paginationOptions): Promise<GetAllLinkedAccounts> {
    const params = {
      ...options
    }
    return this.request(`/api/v2/public/linked-account`, {}, params);
  }

  getLinkedAccountById(linked_account_id: string): Promise<GetLinkedAccount> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    return this.request(`/api/v2/public/linked-account/${linked_account_id}`, {});
  }

  deleteLinkedAccount(linked_account_id: string): Promise<SuccessResponse | ErrorResponse> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")

    return this.request(`/api/v2/public/linked-account/${linked_account_id}`, {
      method: "DELETE",
    });
  }

  migrateAuth(payload: migrateAuthPayload): Promise<any> {
    const params = {
      linked_account_id: payload.linked_account_id
    }
    return this.request(`/api/v2/public/migrate-token`,{
      method: "PUT",
      body: JSON.stringify(payload),
    }, params);
  }

  getTokenForLinkedAccount(payload:getTokenForLinkedAccountPayload): Promise<getTokenForLinkedAccountResponse> {
    return this.request(`/api/v2/public/session-token`,{
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  getApplications(linked_account_id: string): Promise<any> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      linked_account_id
    }
    return this.request(`/api/v2/public/application`, {}, params);
  }

  getApplicationBySlug(linked_account_id: string, slug:string): Promise<any> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    if(slug==="") throw new Error("slug is required")
    const params = {
      linked_account_id
    }
    return this.request(`/api/v2/public/application/${slug}`, {}, params);
  }

  getExecutions(linked_account_id: string, options?: paginationOptions): Promise<any> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/api/v2/public/execution`, {}, params);
  }

  getExecutionById(linked_account_id: string, execution_id:string): Promise<GetExecutions> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      linked_account_id
    }
    return this.request(`/api/v2/public/execution/${execution_id}`, {}, params);
  }
  
  event(payload:webhookTriggerPayload): Promise<any> {
    if(payload.linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      linked_account_id: payload.linked_account_id
    }
    let api = `/api/v2/public/event`
    if(payload?.slug && payload.slug!==""){
      api=`/api/v2/public/event/${payload.slug}`
    }
    return this.request(api, {
      method: "POST",
      body: JSON.stringify(payload)
    }, params);
  }

  updateEvent(payload:updateEventPayload): Promise<Events | ErrorResponse> {

    return this.request(`/api/v2/public/event/${payload.event_id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  }

  deleteEvent(event_id:string): Promise<Events | ErrorResponse> {
    return this.request(`/api/v2/public/event/${event_id}`, {
      method: "DELETE",
    });
  }

  triggerEvent(payload:webhookTriggerPayload): Promise<SuccessResponse |ErrorResponse> {
    if(payload.linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      linked_account_id: payload.linked_account_id
    }
    let api = `/api/v2/public/event/trigger`
    if(payload?.slug && payload.slug!==""){
      api=`/api/v2/public/event/${payload.slug}`
    }
    return this.request(api, {
      method: "POST",
      body: JSON.stringify(payload)
    }, params);
  }

  listEvents(): Promise<Array<Events>|ErrorResponse> {
    return this.request(`/api/v2/public/event`, {});
  }

  listEventById( event_id:string): Promise<Events> {
    return this.request(`/api/v2/public/event/${event_id}`, {});
  }

  getConfig(payload:{
    linked_account_id: string,
    slug: string,
    config_id?: string,
  }): Promise<any> {
    if(payload.linked_account_id==="") throw new Error("linked_account_id is required")
    if(payload.slug==="") throw new Error("slug is required")
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/slug/${payload.slug}/config/${payload.config_id?payload.config_id:""}`, {
      method: "GET",
      body: JSON.stringify(payload)
    }, params);
  }

  config(payload:findOrCreateConfig): Promise<any> {
    if(payload.linked_account_id==="") throw new Error("linked_account_id is required")
    if(payload.slug==="") throw new Error("slug is required")
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/config`, {
      method: "POST",
      body: JSON.stringify(payload)
    }, params);
  }

  updateConfig(payload:updateConfigPayload): Promise<any> {
    if(payload.linked_account_id==="") throw new Error("linked_account_id is required")
    if(payload.slug==="") throw new Error("slug is required")
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/config`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }, params);
  }

  deleteConfig(payload:deleteConfigPayload): Promise<any> {
    if(payload.linked_account_id==="") throw new Error("linked_account_id is required")
    if(payload.slug==="") throw new Error("slug is required")
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/slug/${payload.slug}/config/${payload.config_id?payload.config_id:""}`, {
      method: "DELETE",
      body: JSON.stringify(payload)
    }, params);
  }

  getWebhook(): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook`, {
      method: "GET",
    });
  }

  createWebhook(payload:createWebhookPayload): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  deleteWebhook(): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook`, {
      method: "DELETE"
    });
  }

  subscribeWebhookEvents(payload:subscribeWebhookPayload): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook/subscribe`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  unsubscribeWebhookEvent(payload:unsubscribeWebhookPayload): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook/unsubscribe`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  executeWorkflow<T extends boolean>(workflow_id:string,slug:string,linked_acc:string,sync_execution:T,payload:any) :Promise<T extends false? {
    execution_id: string,
  }: {
    execution_id: string,
    return_value?: any
  }> {
    return this.request(`/api/v1/workflow/${workflow_id}/execute`, {
      method : "POST",
    body: JSON.stringify(payload),
     headers: {
        "linked_account_id": linked_acc,
        "slug": slug,
        "sync_execution": sync_execution?"true":"false"
     }
    });
  }
  
}
