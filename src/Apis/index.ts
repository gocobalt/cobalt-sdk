import { Base } from "../base";
import { LinkedAccount, Templates, Workflows, createLinkedAccountPayload,
         getTokenForLinkedAccountPayload, getTokenForLinkedAccountResponse, 
         templateObj, paginationOptions } from "./types";

export class Apis extends Base {
  createLinkedAccount(createLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/linked-acc`,{
      method: "POST",
      body: JSON.stringify(createLinkedAccountPayload),
    });
  }

  getTokenForLinkedAccount(payload:getTokenForLinkedAccountPayload): Promise<getTokenForLinkedAccountResponse> {
    return this.request(`/auth/linked-account/token`,{
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  getAllTemplates(linked_account_id: string, options?: paginationOptions): Promise<Templates> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/template/published`, {}, params);
  }

  getWorkflows(linked_account_id: string, options?: paginationOptions): Promise<Workflows> {
    if(linked_account_id==="") throw new Error("linked_account_id is required")
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/workflow/sdk`, {}, params);
  }

}