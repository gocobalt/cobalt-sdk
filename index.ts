import axios from 'axios';

const API_URL: string = 'https://embedapi.getbreakout.com/api/v1';

export function CreateLinkedAccount(api_key: string, account_id: string, sdk_id: string): Promise<object> {
    return new Promise((resolve, reject) => {

        axios({
            method: 'post',
            url: `${API_URL}/linked-acc`,
            headers: {'x-api-key': api_key},
            data: {
                "account_id":account_id,
                "sdk_id": sdk_id
            }
          })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch(reject);
    });
  }
  
  export function getAllTemplates(): Promise<object> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/template`)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch(reject);
    });
  }

  export function installTemplate(template_id:string): Promise<object> {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_URL}/${template_id}/install`)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch(reject);
    });
  }
  
  export default { CreateLinkedAccount, getAllTemplates, installTemplate };