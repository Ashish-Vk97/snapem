
import * as apis from './api.request'

// const url = "http://localhost:3000/api"


// const TAG = "subscription.service";
const path = "/subscription";
const paymentPath = "/payment";

async function getAllSubscriptionList() {
  console.log("Body data");
  // debugger;
  return await apis.hitAxiosGetApi(`${path}/all`);
}

async function addSubscriptionDetails(body:any) {
  let data = {...body}
  data.perks = data.perks.split(",")
  console.log("Body data");
  // debugger;
  return await apis.hitPostApi(`${path}/create`,data);
}
async function addPaymentCheckout(body:any) {
  let data = {...body, PRICE_ID: body.priceId}
   delete data.priceId
 
  console.log("Body data");
  // debugger;
  return await apis.hitPostApi(`${paymentPath}/create-checkout-session`,data);
}
async function addPaymentSuccess(id:string) {
 
  
  // debugger;
  return await apis.hitAxiosGetApi(`${paymentPath}/success?session_id=${id}`);
}
async function updateSubscriptionDetails(id:string,body:any) {
  console.log("Body data");
  // debugger;
  return await apis.hitAxiosPutApi(`${path}/update/${id}`,body);
}

async function customerPortalSubscription(customerId:string) {
  console.log("Body data");
  // debugger;
  return await apis.hitAxiosGetApi(`${paymentPath}/customerportal/${customerId}`);

}




export { getAllSubscriptionList,updateSubscriptionDetails,addSubscriptionDetails,addPaymentCheckout ,addPaymentSuccess,customerPortalSubscription};