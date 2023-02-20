import { Base } from "../base";
import { LinkedAccount, Templates, Workflows, createLinkedAccountPayload,
         getTokenForLinkedAccountPayload, getTokenForLinkedAccountResponse, 
         templateObj, paginationOptions, updateAuthCredentialsPayload, getApplicationsOptions, 
         getAllPublishedTemplatesOptions, getTemplatesForConnectedAppsOptions, getWorkflowsOptions,
         webhookTriggerPayload } from "./types";

export class Apis extends Base {
  createLinkedAccount(createLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/api/v1/linked-acc`,{
      method: "PUT",
      body: JSON.stringify(createLinkedAccountPayload),
    });
  }

  getTokenForLinkedAccount(payload:getTokenForLinkedAccountPayload): Promise<getTokenForLinkedAccountResponse> {
    return this.request(`/api/v1/auth/linked-acc/token`,{
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  getApplications(linked_account_id: string, options?: getApplicationsOptions): Promise<Workflows> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/api/v1/linked-acc/application`, {}, params);
  }

  triggerWebhookEvent(payload:webhookTriggerPayload): Promise<any> {
    return this.request(`/api/v1/webhook/sdk-trigger`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
}