export declare type LinkedAccount = {
    id: number;
    title: string;
    body: string;
    userId: number;
  };

  export declare type templateObj = {
    _id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    template_published: boolean
  }
  
  export declare type Templates = {
    docs: templateObj[];
    totalDocs: number;
    "limit": number,
    "totalPages": number,
    "page": number,
    "pagingCounter": number,
    "hasPrevPage": boolean,
    "hasNextPage": boolean,
    "prevPage": number,
    "nextPage": number
  };

  export declare type workflowObj = {
    "_id": string,
    "name": string,
    "status": string,
    "createdAt": Date,
    "updatedAt": Date
  }

  export declare type Workflows = {
    docs: workflowObj[];
    totalDocs: number;
    "limit": number,
    "totalPages": number,
    "page": number,
    "pagingCounter": number,
    "hasPrevPage": boolean,
    "hasNextPage": boolean,
    "prevPage": number,
    "nextPage": number
  }

export declare type createLinkedAccountPayload = {
    linked_account_id: string,
    name?: string,
    udf?: Record<string, any>,
    your_app?: {
      app_id:string,
      auth_credentials:Record<string, any>
    }
}

export declare type migrateAuthPayload = {
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

export declare interface getAllPublishedTemplatesOptions extends paginationOptions {
    app_id?:string,
    app_type?:string
}
export declare interface getTemplatesForConnectedAppsOptions extends paginationOptions {
  app_id?:string,
  app_type?:string
}

export declare interface getWorkflowsOptions extends paginationOptions {
  app_id?:string,
  app_type?:string
}

export declare interface getApplicationsOptions extends paginationOptions  {
  slug?: string,
}
export declare type getTokenForLinkedAccountResponse = {
  token: string
}

export declare type updateAuthCredentialsPayload = {
  linked_account_id: string,
  auth_credentials: any
}

export declare type webhookTriggerPayload = {
  linked_account_id: string,
  event: string,
  config_id?: string,
  slug?: string,
  payload?:Record<string, any>
}

export declare type findOrCreateConfig = {
  linked_account_id: string,
  slug:string,
  config_id?: string,
  labels?:Record<string, Record<string, string>[]>
}

export declare type updateConfigPayload = {
  linked_account_id: string,
  slug:string,
  config_id?: string,
  fields?:Record<string, Record<string, string>>,
  workflows?:Array<{
    id: string,
    enabled: boolean,
    fields: Record<string, string>
  }>
}

export declare type deleteConfigPayload = {
  linked_account_id: string,
  slug: string,
  config_id?: string,
}