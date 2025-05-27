import * as apis from './api.request'

// const TAG = "users.service";
const path = "/emergency";

export async function hitEmergencyContactApi(): Promise<any> {
  return await apis.hitAxiosGetApi(`${path}/all`);

  }
  export async function addEmergencyContact(body:any): Promise<any> {
  return await apis.hitPostApi(`${path}/create`, body);

  }
  