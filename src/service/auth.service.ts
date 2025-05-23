
import * as apis from './api.request'

// const url = "http://localhost:3000/api"


// const TAG = "auth.service";
const path = "/auth";

async function signIn(body:any) {
  console.log("Body data", body);
  // debugger;
  return await apis.hitAuthLessPostApi(`${path}/login`, body);
}
async function signUp(body: any) {
        return await apis.hitAuthLessPostApi(`${path}/signup`, body);
      }

async function forgotPassword(body: any) {
  return await apis.hitAuthLessPostApi(`${path}/forgot-password`, body);
}



export { signIn,signUp, forgotPassword };