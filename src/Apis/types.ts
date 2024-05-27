export declare type LinkedAccount = {
  id: number
  title: string
  body: string
  userId: number
}

declare type Integration = {
  refresh_token_expired: boolean
  _id: string
  type: string
  name: string
  icon: string
  identifier?: string
  is_default: boolean
  credentials?: {
    client_id: string
    client_secret: string
    callback_url: string
    environment?: string
    base_url?: string
    api_key?: string
    api_token?: string
  }
  authTokens?: {
    access_token: string
    refresh_token: string
    server?: string
    base_url?: string
  }
  createdAt: string
  updatedAt: string
}

export declare type GetLinkedAccount = {
  _id: string
  associated_org: string
  account_id: string
  environment: string
  name: string
  integrations?: Integration[]
  udf?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export declare type GetAllLinkedAccounts = {
  docs: GetLinkedAccount[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}


export declare type createLinkedAccountPayload = {
  linked_account_id: string,
  name?: string,
  udf?: Record<string, any>,
  your_app?: {
    app_id: string,
    auth_credentials: Record<string, any>
  }
}

export declare type migrateAuthPayload = {
  linked_account_id: string,
  slug: string,
  auth_object: Record<string, string>
}

export declare type getTokenForLinkedAccountPayload = {
  linked_account_id: string,
}

export declare interface paginationOptions {
  page?: number,
  limit?: number
}

export declare type getTokenForLinkedAccountResponse = {
  token: string
}


export declare type webhookTriggerPayload = {
  linked_account_id: string,
  event: string,
  config_id?: string,
  slug?: string,
  payload?: Record<string, any>
}

export declare type findOrCreateConfig = {
  linked_account_id: string,
  slug: string,
  config_id?: string,
  labels?: Record<string, Record<string, string>[]>
}

export declare type updateConfigPayload = {
  linked_account_id: string,
  slug: string,
  config_id?: string,
  fields?: Record<string, string | Record<string, string>>,
  workflows?: Array<{
    id: string,
    enabled: boolean,
    fields: Record<string, string | Record<string, string>>
  }>
}

export declare type deleteConfigPayload = {
  linked_account_id: string,
  slug: string,
  config_id?: string,
}

export declare type GetExecutions = {
  name: string
  nodes?: WorkflowNode[]
  status: string
  createdAt: string
  linked_account_id: string
  org_id: string
  environment: string
  config_id: string
}

interface WorkflowNode {
  node_id: string
  is_batch: boolean
  maximum_attempts: number
  attempts_made: number
  input_data?: string
  latest_output: string
  execution_time: number
  node_name: string
  node_type: string
  node_status: string
}


export declare type createWebhookPayload = {
  webhook_url: string,
  webhook_events: Array<string>,
}

export declare type Webhook = {
  _id: string
  webhook_url?: string,
  webhook_events?: Array<string>,
}

export declare type subscribeWebhookPayload = {
  webhook_events: Array<string>,
}

export declare type unsubscribeWebhookPayload = {
  webhook_event: string,
}

export declare type SuccessResponse = {
  message: string
}

export declare type ErrorResponse = {
  status_code: number
  error_type: string
  message: string
  request_id: string
}