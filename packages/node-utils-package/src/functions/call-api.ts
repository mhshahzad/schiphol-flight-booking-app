import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type SuccessHandler<T = any> = (response: AxiosResponse<T>) => void;
type ErrorHandler = (error: any) => void;

export async function callApi<T = any>(
    instance: AxiosInstance,
    endpoint: string,
    config: AxiosRequestConfig = {},
    onSuccess?: SuccessHandler<T>,
    onError?: ErrorHandler
): Promise<T | undefined> {
    try {
        const response = await instance(endpoint, config);
        if (onSuccess) onSuccess(response);
        return response.data;
    } catch (error) {
        if (onError) onError(error);
        else throw error;
    }
}