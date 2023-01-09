import { Base } from "../base";
import { LinkedAccount, Templates, Workflows, createLinkedAccountPayload,
         getTokenForLinkedAccountPayload, getTokenForLinkedAccountResponse, 
         templateObj, paginationOptions, updateAuthCredentialsPayload, getApplicationsOptions } from "./types";

export class Apis extends Base {
  createLinkedAccount(createLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/api/v1/linked-acc`,{
      method: "POST",
      body: JSON.stringify(createLinkedAccountPayload),
    });
  }

  getTokenForLinkedAccount(payload:getTokenForLinkedAccountPayload): Promise<getTokenForLinkedAccountResponse> {
    return this.request(`/api/v1/auth/linked-acc/token`,{
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  getAllPublishedTemplates( options?: paginationOptions): Promise<Templates> {
    const params = {
      ...options
    }
    return this.request(`/api/v1/template/published`, {}, params);
  }

  getTemplatesForConnectedApps(linked_account_id: string, options?: paginationOptions): Promise<Templates> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/api/v1/linked-acc/template`, {}, params);
  }

  getWorkflows(linked_account_id: string, options?: paginationOptions): Promise<Workflows> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/api/v2/workflow`,{},params);
  }

  getApplications(linked_account_id: string, options?: getApplicationsOptions): Promise<Workflows> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/api/v1/linked-acc/application`, {}, params);
  }

  deleteWorkflow(workflow_id: string): Promise<any> {
    return this.request(`/api/v2/workflow/${workflow_id}`, {
      method: "DELETE",
    });
  }
  
  updateAuthCredentials(app_id: string, payload:updateAuthCredentialsPayload): Promise<any> {
    return this.request(`/api/v1/custom/${app_id}/credentials`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}