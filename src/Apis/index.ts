import { Base } from "../base";
import { LinkedAccount, Template, createLinkedAccountPayload, getTokenForLinkedAccountPayload, getTokenForLinkedAccountResponse } from "./types";

export class Apis extends Base {
  createLinkedAccount(createLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/linked-acc`,{
      method: "POST",
      body: JSON.stringify(createLinkedAccountPayload),
    });
  }

  getTokenForLinkedAccount(payload:getTokenForLinkedAccountPayload): Promise<getTokenForLinkedAccountResponse> {
    return this.request(`/auth/linked-account/token`,{
      method: "GET",
      body: JSON.stringify(payload),
    });
  }

  getAllTemplates(): Promise<Template[]> {
    return this.request(`/template`);
  }

  installTemplate(template_id: string): Promise<Template> {
    return this.request(`/${template_id}/install`, {
      method: "PUT"
    });
  }
}