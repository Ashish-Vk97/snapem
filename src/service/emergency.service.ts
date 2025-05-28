import * as apis from './api.request'

// const TAG = "users.service";
const path = "/emergency";

export async function hitEmergencyContactApi(): Promise<any> {
  return await apis.hitAxiosGetApi(`${path}/all`);

  }
  export async function addEmergencyContact(body:any): Promise<any> {
  return await apis.hitPostApi(`${path}/create`, body);

  }

   export async function editEmergencyContactApi( id:string,body:any): Promise<any> {
  return await apis.hitAxiosPutApi(`${path}/update/${id}`, body);

  }
export async function deleteEmergencyContact(id:string): Promise<any> {
  // return await apis.hitPostApi(`${path}/delete/${id}`, {});

  }
  