import * as apis from "./api.request";

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

export async function hitGetUserById(
  id: string,
  token: string,
  page: number = 1,
  limit = 10
) {
  console.log("hellooo api call");
  return await apis.hitAxiosGetIdApi(path, id, page, limit, token);
}

export async function fetchUserDetailsById(
  id: string,
  page: number = 1,
  limit = 10
) {
  console.log("hellooo api call");
  return await apis.hitAxiosGetIdApi(
    path,
    id,
    page,
    limit,
    localStorage.getItem("AUTH_TOKEN") || ""
  );
}

export async function hitGetAllUsers(
  page: number = 1,
  limit: number = 10,
  searchQuery = ""
) {
  return await apis.hitAxiosGetApi(`${path}/all`, page, limit, searchQuery);
}
export async function updateUserProfile(
  id: String,
  body: any,
  isAdressUpdate: boolean = false
) {
  if (isAdressUpdate) {
    let payload: Record<string, any> = {};
    const address = {
      country: body.country,
      state: body.state,
      city: body.city,
      pincode: body.pincode,
    };
    payload["address"] = address;

    return await apis.hitAxiosPutApi(`${path}/update/${id}`, payload);
  }
  return await apis.hitAxiosPutApi(`${path}/update/${id}`, body);
}

export async function updateStatus(id: string, status: string) {
  const statusParam = status.toLowerCase().includes("inactive")
    ? "inactive"
    : "active";
  const payload = { status: statusParam };
  return await apis.hitAxiosPutApi(`${path}/active-status/${id}`, payload);
}
export async function updateFreeAccess(id: string, status: boolean) {
  console.log(status, "status in updateFreeAccess");
  const statusParam = status ? "true" : "false";
  const payload = { status: statusParam };
  return await apis.hitAxiosPutApi(`${path}/free-access/${id}`, payload);
}
