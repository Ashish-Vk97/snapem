import * as apis from "./api.request";

// const TAG = "users.service";
const path = "/screenshot";
const snapshotPath = "/snapshot";
const videoPath = "/video";

export async function hitScreenshotsFolders(userId: string): Promise<any> {
  console.log(`userIds===>`, userId);
  return await apis.hitAxiosGetApi(
    `${path}/folders/all?${userId ? `id=${userId}` : ""}`
  );
}
export async function hitSnapshotsFolders(userId: string): Promise<any> {
  console.log(`userIds===>`, userId);
  return await apis.hitAxiosGetApi(
    `${snapshotPath}/folders/all?${userId ? `id=${userId}` : ""}`
  );
}
export async function hitVideoFolders(userId: string): Promise<any> {
  console.log(`userIds===>`, userId);
  return await apis.hitAxiosGetApi(
    `${videoPath}/sos/folders?${userId ? `id=${userId}` : ""}`
  );
}

export async function fetchScreenshotListById(
  id: string,
  page: number = 1,
  limit = 10
): Promise<any> {
  return await apis.hitAxiosGetIdApi(
    `${path}/images/all`,
    id,
    page,
    limit,
    localStorage.getItem("AUTH_TOKEN") || ""
  );
}
export async function fetchSnapshotListById(
  id: string,
  page: number = 1,
  limit = 10
): Promise<any> {
  return await apis.hitAxiosGetIdApi(
    `${snapshotPath}/images/all`,
    id,
    page,
    limit,
    localStorage.getItem("AUTH_TOKEN") || ""
  );
}

export async function fetchVideoListById(
  id: string,
  page: number = 1,
  limit = 10
): Promise<any> {
  return await apis.hitAxiosGetIdApi(
    `${videoPath}/sos/folders/videos`,
    id,
    page,
    limit,
    localStorage.getItem("AUTH_TOKEN") || ""
  );
}

export async function screenshotListDelete(
  body: any,
  userId: string
): Promise<any> {
  return await apis.hitAxiosDeleteApiBody(`${path}/delete?id=${userId}`, body);
}
export async function videoListDelete(body: any, userId: string): Promise<any> {
  return await apis.hitAxiosDeleteApiBody(
    `${videoPath}/delete?id=${userId}`,
    body
  );
}
export async function snapshotListDelete(
  body: any,
  userId: string
): Promise<any> {
  return await apis.hitAxiosDeleteApiBody(`${snapshotPath}/delete?id=${userId}`, body);
}

