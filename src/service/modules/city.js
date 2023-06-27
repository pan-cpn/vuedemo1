import requestData from '.././request/request.js';
export function getAllCity(){
    return requestData.get({url: '/city/all'});
}