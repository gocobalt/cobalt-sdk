import axios from "axios";

type Environment = "sandbox" | "production" | "staging";

type Config =   { apiKey: string; 
  /** @deprecated use environment field instead for specifying the environment */ 
  sandbox?: boolean; 
  environment?: Environment 
  server_url?: string
}

export abstract class Base {
  private apiKey: string;
  private sandbox: boolean | null = null;
  private environment: Environment | null = null
  private server_url: string | null = null

  constructor(config: Config) {
    this.apiKey = config.apiKey;
    this.server_url = config.server_url;
    if ('sandbox' in config && config.sandbox !== undefined) {
      if ('environment' in config && config.environment !== undefined) {
        throw new Error("You can't use both environment and sandbox fields together");
      }
      console.warn("The sandbox field is deprecated, use environment field instead");
      this.sandbox = config.sandbox;
    } else if ('environment' in config && config.environment !== undefined) {
      this.environment = config.environment;
    } 
  }


  protected request<T>(endpoint: string, options?: RequestInit, params?:any): Promise<T> {
    let url:string;

    if (this.server_url) {
      url = `${this.server_url}${endpoint}`;
    } else if (this.environment === "staging") {
      url = `https://sapis.gocobalt.io${endpoint}`;
    } else if (this.environment === "sandbox" || this.sandbox === true) {
      url = `https://embedapi.gocobalt.io${endpoint}`;
    } else {
      url = `https://api.gocobalt.io${endpoint}`; // default to production
    }


    const headers = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };

    if (options.headers){
      Object.assign(headers, options.headers);
      delete options.headers;
    }

    if(params && params.linked_account_id){
      headers["linked_account_id"] = params.linked_account_id
    }

    const config = {
      ...options,
      data:options?.body,
      headers,
      params
    };

    return axios(url, config).then((response) => {
      if (response.data) {
        return response.data;
      }
      throw new Error("Something went wrong!")
    }).catch(error=>{
      if(error?.response?.data?.message){
        throw new Error(error.response.data.message);
      }
      throw new Error(error);
    });
  }
}
