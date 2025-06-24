import * as apis from "./api.request";

// const TAG = "users.service";
const path = "/screenshot";
const videoPath = "/video";

export async function hitScreenshotsFolders(userId: string): Promise<any> {
  console.log(`userIds===>`, userId);
  return await apis.hitAxiosGetApi(
    `${path}/folders/all?${userId ? `id=${userId}` : ""}`
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
