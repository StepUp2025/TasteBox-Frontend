import axios, {AxiosRequestConfig} from 'axios';

const BASE_URL = import.meta.env.BASE_URL; //백엔드 주소
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL : BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "content-type": "application/json",
        },
        withCredentials: true, //쿠키 전송 허용
        ...config,
    });


    return axiosInstance;
};

export const httpClient = createClient();


/// API 요청 핸들러
type RequestMethod = "get" | "post" | "patch" | "put" | "delete";

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
    let response;

    switch (method) {
        case "get":
            response = await httpClient.get(url);
            break;
        case "post":
            response = await httpClient.post(url, payload);
            break;
        case "patch":
            response = await httpClient.patch(url, payload);
            break;
        case "put":
            response = await httpClient.put(url, payload);
            break;
        case "delete":
            response = await httpClient.delete(url);
            break;
        default:
            throw new Error("Invalid request method");
    }

    return response.data;
}