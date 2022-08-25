import axios from "axios";

type Config = {
  apiKey: string;
  sandbox?: boolean;
};

export abstract class Base {
  private apiKey: string;
  private sandbox: boolean;

  constructor(config: Config) {
    this.apiKey = config.apiKey;
    this.sandbox = config.sandbox || false;
  }

  protected request<T>(endpoint: string, options?: RequestInit, params?:any): Promise<T> {
    let url:string;
    if(this.sandbox===true){
        url = `https://sandbox.getbreakout.com/api/v1${endpoint}`;
    }else{
        url = `https://embedapi.getbreakout.com/api/v1${endpoint}`;
    }

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };

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
      if(error?.response?.data.error){
        throw new Error(error.response.data.error);
      }
      throw new Error(error);
    });
  }
}