import axios from "axios";


const getServerUrl = (env:string) => {
    if (env == "PRODUCTION")
        return "http://ec2-3-86-59-23.compute-1.amazonaws.com:3000/api"
    else if (env == "STAGING")
        return "https://leadstaging.utkallabs.com/api"
    else if (env == "CLIENT")
        return "https://tryulalpha.utkallabs.com/api"
    else
        return "http://localhost:3000/api"
}

export const environment = {
    PRODUCTION: "PRODUCTION",
    STAGING: "STAGING",
    CLIENT: "CLIENT",
    LOCAL: "",
  };
  const API_URL = getServerUrl(environment.LOCAL);


  export async function hitAuthLessPostApi(path: string, body: any): Promise<any> {
    return await hitAxiosPostApi(`${API_URL}${path}`, body);
  }

  export async function hitPostApi(path: string, body: any): Promise<any> {
    return await hitAxiosPostApi(`${API_URL}${path}`, body);
  }

  export async function hitChangePasswordApi(path: string, password: string,token:string): Promise<any> {
    return await axios.put(
      `${API_URL}${path}/change-password`,
      { password: password },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  }
  export async function hitAxiosGetIdApi(path: string, id: string,token:string): Promise<any> {
    return await axios.get(
      `${API_URL}${path}/${id}`,
      
      {
        headers: {
          // authorization: `Bearer ${token}`,
          authorization: `Bearer ${token} || ${localStorage.getItem("AUTH_TOKEN") }`,
        },
      }
    );
  }

  export async function hitAxiosPostApi(url:string, body:any): Promise<any> {
    return await axios.post(url, body, {
      headers: {
        accept: "*/*",
        contentType: "application/json",
        authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    });
  }
  
  // async function hitAxiosPostApiWithFormData(url:string, body:any): Promise<any> {
  //   return await axios.post(url, body, {
  //     headers: {
  //       accept: "*/*",
  //       contentType: "multipart/form-data",
  //       authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
  //     },
  //   });
  // }
  
 export async function hitAxiosGetApi(path:string): Promise<any> {
    return await axios.get(`${API_URL}/${path}`, {
      headers: {
        accept: "*/*",
        contentType: "application/json",
        authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    });
  }
  
 export async function hitAxiosPutApi(path:string, body:any): Promise<any> {
    return await axios.put(`${API_URL}${path}`, body, {
      headers: {
        accept: "*/*",
        contentType: "application/json",
        authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    });
  }
 
  
 export async function hitAxiosDeleteApi(url:string): Promise<any> {
    return await axios.delete(`${API_URL}${url}`, {
      headers: {
        accept: "*/*",
        contentType: "application/json",
        authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    });
  }
  