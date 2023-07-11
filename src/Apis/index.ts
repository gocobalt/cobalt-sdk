import { Base } from "../base";
import { LinkedAccount, Templates, Workflows, createLinkedAccountPayload,
         getTokenForLinkedAccountPayload, getTokenForLinkedAccountResponse, 
         templateObj, paginationOptions, updateAuthCredentialsPayload, getApplicationsOptions, 
         getAllPublishedTemplatesOptions, getTemplatesForConnectedAppsOptions, getWorkflowsOptions,
         webhookTriggerPayload, migrateAuthPayload, findOrCreateConfig, updateConfigPayload, deleteConfigPayload } from "./types";

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

  getApplications(linked_account_id: string, options?: paginationOptions): Promise<any> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
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
    return this.request(`/api/v2/public/executions`, {}, params);
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

  findOrCreateConfig(payload:findOrCreateConfig): Promise<any> {
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
}