import Axios, { AxiosError, AxiosHeaders, AxiosInstance, RawAxiosRequestHeaders } from 'axios';

export const createAxiosInstance = (apiUrl: string, headers?: AxiosHeaders | RawAxiosRequestHeaders) => {
    return Axios.create({
        baseURL: apiUrl,
        timeout: 300000,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        // withCredentials: true
    });
};

class AxiosClass {
    $axios: AxiosInstance;

    constructor() {
        // Sử dụng biến môi trường từ import.meta.env
        const apiUrl = import.meta.env.VITE_API_URL || '';
        this.$axios = createAxiosInstance(apiUrl);
    }

    async get(url: string, query?: any) {
        try {
            const response = await this.$axios.get(url, { params: query });
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }

    async post(url: string, data: any) {
        try {
            const response = await this.$axios.post(url, data);

            return response.data;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }

    async patch(url: string, data: any) {
        try {
            const response = await this.$axios.patch(url, data);
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }

    async put(url: string, data: any) {
        try {
            const response = await this.$axios.put(url, data);
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }

    async delete(url: string, data?: any) {
        try {
            const response = await this.$axios.delete(url, {
                data: data,
            });
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }
}

const axiosIntance = new AxiosClass();
export default axiosIntance;
