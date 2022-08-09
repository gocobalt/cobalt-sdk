import { Base } from "../base";
import { LinkedAccount, Template, createLinkedAccountPayload } from "./types";

export class Apis extends Base {
  createLinkedAccount(createLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/linked-acc`,{
      method: "POST",
      body: JSON.stringify(createLinkedAccountPayload),
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