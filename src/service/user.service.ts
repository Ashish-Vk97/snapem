import * as apis from './api.request'

// const TAG = "users.service";
const path = "/users";

interface ChangePasswordPayload {
  password: string;
  token: string;
}


export async function hitChangePassword(payload: ChangePasswordPayload) {
  console.log(payload.password, payload.token);
  return await apis.hitChangePasswordApi(path, payload.password, payload.token);
}

export async function hitGetUserById(id:string, token:string) {

  console.log("hellooo api call");
  return await apis.hitAxiosGetIdApi(path, id, token);
}

export async function hitGetAllUsers() {
  
  return await apis.hitAxiosGetApi(`${path}/all`);
}