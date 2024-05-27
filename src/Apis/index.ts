import { Base } from "../base"
import {
  LinkedAccount,
  createLinkedAccountPayload,
  getTokenForLinkedAccountPayload,
  getTokenForLinkedAccountResponse,
  paginationOptions,
  webhookTriggerPayload,
  migrateAuthPayload,
  findOrCreateConfig,
  updateConfigPayload,
  deleteConfigPayload,
  createWebhookPayload,
  subscribeWebhookPayload,
  unsubscribeWebhookPayload,
  GetLinkedAccount,
  GetAllLinkedAccounts,
  SuccessResponse,
  ErrorResponse,
  GetExecutions,
  Webhook,
} from "./types"

export class Apis extends Base {

  /**
   * Creates a linked account in the environment based on the API key.
   * 
   * @param createLinkedAccountPayload - The payload containing the necessary information to create the linked account.
   * @returns A Promise that resolves to the created LinkedAccount object.
   * 
   * @remarks
   * This method is used to create a linked account in the environment using the provided API key. 
   * The authentication credentials for the default app for the linked account can be passed along with an identifier (UDF).
   */
  createLinkedAccount(createLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/api/v2/public/linked-account`, {
      method: "POST",
      body: JSON.stringify(createLinkedAccountPayload),
    })
  }

  upsertLinkedAccount(upsertLinkedAccountPayload: createLinkedAccountPayload): Promise<LinkedAccount> {
    return this.request(`/api/v2/public/linked-account`, {
      method: "PUT",
      body: JSON.stringify(upsertLinkedAccountPayload),
    })
  }

  getAllLinkedAccounts(options?: paginationOptions): Promise<GetAllLinkedAccounts> {
    const params = {
      ...options
    }
    return this.request(`/api/v2/public/linked-account`, {}, params);
  }

  getLinkedAccountById(linked_account_id: string): Promise<GetLinkedAccount> {
    if (!linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    return this.request(`/api/v2/public/linked-account/${linked_account_id}`, {});
  }

  deleteLinkedAccount(linked_account_id: string): Promise<SuccessResponse | ErrorResponse> {
    if (!linked_account_id) {
      throw new Error("linked_account_id is required")
    }

    return this.request(`/api/v2/public/linked-account/${linked_account_id}`, {
      method: "DELETE",
    });
  }

  migrateAuth(payload: migrateAuthPayload): Promise<any> {
    const params = {
      linked_account_id: payload.linked_account_id
    }
    return this.request(`/api/v2/public/migrate-token`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }, params);
  }
  /**
   * Generates Session Token For Linked Account
   * 
   * @remarks
   * This method creates session token for a linked account based on linked account Id.
   * The session token is temporary access token, which will allow users to access methods on 
   * cobalt's frontend SDK. 
   */
  getTokenForLinkedAccount(payload: getTokenForLinkedAccountPayload): Promise<getTokenForLinkedAccountResponse> {
    return this.request(`/api/v2/public/session-token`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
  /**
   *Lists applications for linked account
   *
   *@remarks
   *This method lists all applications which are enabled by an organization for a linked account 
   along with it's authentication status  
   *
   */
  getApplications(linked_account_id: string): Promise<any> {
    if (!linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    const params = {
      linked_account_id
    }
    return this.request(`/api/v2/public/application`, {}, params);
  }
  /**
   * Gets Application By SLug for alinked account
   * @returns
   * 
   * Fetches details of an application by it's slug for a given linked account.
   * The details beyond the basic info such as name icon, include autorization status, type of auth supported.
   * And supporting auth_maps, which helps user to build custom UIs 
   */
  getApplicationBySlug(linked_account_id: string, slug: string): Promise<any> {
    if (!linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    if (!slug) {
      throw new Error("Slug is required")
    }
    const params = {
      linked_account_id
    }
    return this.request(`/api/v2/public/application/${slug}`, {}, params);
  }

  /**
   * 
   * @remarks 
   */
  getExecutions(linked_account_id: string, options?: paginationOptions): Promise<any> {
    if (!linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    const params = {
      ...options,
      linked_account_id
    }
    return this.request(`/api/v2/public/execution`, {}, params);
  }

  getExecutionById(linked_account_id: string, execution_id: string): Promise<GetExecutions> {
    if (!linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    const params = {
      linked_account_id
    }
    return this.request(`/api/v2/public/execution/${execution_id}`, {}, params);
  }
  
  /**
   * Triggers an event from default app to cobalt.
   * 
   * @param payload - The payload containing the necessary information to trigger the event.
   * @returns A Promise that resolves to the response from the event trigger.
   * 
   * @remarks
   * This method is used to trigger an event from default app to cobalt. 
   * The enabled workflows in the config , which have trigger matching the event will be executed.
   * The `linked_account_id` is required in the payload to identify the linked account.
   * The `slug` parameter in the payload is optional and can be used to specify a specific 
   * application, in that case only workflow belonging to that application will be triggered. 
   */
  event(payload: webhookTriggerPayload): Promise<any> {
    if (!payload.linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    const params = {
      linked_account_id: payload.linked_account_id
    }
    let api = `/api/v2/public/event`
    if (payload?.slug && payload.slug !== "") {
      api = `/api/v2/public/event/${payload.slug}`
    }
    return this.request(api, {
      method: "POST",
      body: JSON.stringify(payload)
    }, params);
  }

  getConfig(payload: {
    linked_account_id: string,
    slug: string,
    config_id?: string,
  }): Promise<any> {
    if (!payload.linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    if (!payload.slug) {
      throw new Error("slug is required")
    }
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/slug/${payload.slug}/config/${payload.config_id ? payload.config_id : ""}`, {
      method: "GET",
      body: JSON.stringify(payload)
    }, params);
  }

  /**
   * Get or Create, config by config Id
   * 
   * @remarks
   * This method, gets an existing config by config_id, 
   * In case a config with the given config_id does not exist it creates one.
   * In case config_id is missing, the provided linked_account_id is used as config_id
   */
  config(payload: findOrCreateConfig): Promise<any> {
    if (!payload.linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    if (!payload.slug) {
      throw new Error("slug is required")
    }
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/config`, {
      method: "POST",
      body: JSON.stringify(payload)
    }, params);
  }

  /**
   * Updates a config based on config_id
   * 
   * @remarks
   * Updates config by config_id.
   * Updating config will involve, setting fields with values & enabling/disabling workflows.
   * In case a config with the given config_id does not exist it throws an error.
   * In case config_id is missing, the provided linked_account_id is used as config_id
   */
  updateConfig(payload: updateConfigPayload): Promise<any> {
    if (!payload.linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    if (!payload.slug) {
      throw new Error("slug is required")
    }
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/config`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }, params);
  }

  /**
   * This method, gets config by config_id, 
   * In case a config with the given config_id does not exist it creates one.
   * In case config_id is missing, the provided linked_account_id is used as config_id
   */
  deleteConfig(payload: deleteConfigPayload): Promise<any> {
    if (!payload.linked_account_id) {
      throw new Error("linked_account_id is required")
    }
    if (!payload.slug) {
      throw new Error("slug is required")
    }
    const params = {
      linked_account_id: payload.linked_account_id
    }

    return this.request(`/api/v2/public/slug/${payload.slug}/config/${payload.config_id ? payload.config_id : ""}`, {
      method: "DELETE",
      body: JSON.stringify(payload)
    }, params);
  }

  getWebhook(): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook`, {
      method: "GET",
    });
  }
  createWebhook(payload: createWebhookPayload): Promise<Webhook> {
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

  subscribeWebhookEvents(payload: subscribeWebhookPayload): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook/subscribe`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  unsubscribeWebhookEvent(payload: unsubscribeWebhookPayload): Promise<Webhook> {
    return this.request(`/api/v2/public/webhook/unsubscribe`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
}
