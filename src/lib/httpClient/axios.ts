import axios from "axios";
const base_url = process.env.API_BASE_URL;
export interface ApiRequestOptions {
    params?:Record<string,unknown>,
    headers?:Record<string,string>
}
if(!base_url){
    throw new Error("Api base_url is required")
}
const axiosInstance = () => {
    const instance = axios.create({
        baseURL:base_url ,
        timeout: 1000,
        headers: { 
            "Content-Type":"application/json"
         }
    });
    return instance
};

const httpGet = async(endPoint:string,options?:ApiRequestOptions)=>{
    try {
        const res = await axiosInstance().get(endPoint,{
            params:options?.params,
            headers:options?.headers
        });

        return res.data;
    } catch (error) {
        console.error( `GET request Error ${endPoint} failed, ${error}`);
        throw error
    }
}
const httpPost = async(endPoint:string, data:unknown, options?:ApiRequestOptions)=>{
    try {
        const res = await axiosInstance().post(endPoint,data,{
            params:options?.params,
            headers:options?.headers
        });

        return res.data;
    } catch (error) {
        console.error( `POST request Error ${endPoint} failed, ${error}`);
        throw error
    }
}
const httpPatch = async(endPoint:string, data:unknown, options?:ApiRequestOptions)=>{
    try {
        const res = await axiosInstance().patch(endPoint,data,{
            params:options?.params,
            headers:options?.headers
        });

        return res.data;
    } catch (error) {
        console.error( `PATCH request Error ${endPoint} failed, ${error}`);
        throw error
    }
}
const httpDelete = async(endPoint:string,  options?:ApiRequestOptions)=>{
    try {
        const res = await axiosInstance().delete(endPoint,{
            params:options?.params,
            headers:options?.headers
        });

        return res.data;
    } catch (error) {
        console.error( `DELETE request Error ${endPoint} failed, ${error}`);
        throw error
    }
}


export const httpClient = {
    get:httpGet,
    post:httpPost,
    patch:httpPatch,
    delete:httpDelete
}