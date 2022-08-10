export declare type LinkedAccount = {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
  
  export declare type Template = {
    title: string;
    body: string;
    userId: number;
  };

export declare type createLinkedAccountPayload = {
    account_id: string, 
    embed_id: string
}