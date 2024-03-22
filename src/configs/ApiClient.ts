import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];

const errorCallback = (status: number, error: string) => {
  return { status, error };
};

const processQueue = (error: AxiosError | null, token = null) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token);
    }
  });

  failedQueue = [];
};

class ApiClient {
  baseURL: string;
  tokenType: string;

  constructor(baseURL?: string, tokenType?: string) {
    this.baseURL = baseURL;
    this.tokenType = tokenType || 'Authorization';
  }

  getInstance() {
    const api: AxiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token') ?? '';
        if (config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => {
        const data = response.data;
        if (data.success === false) {
          const message = typeof data?.message === 'string' ? data?.message : '';
          return { ...response.data, status: 400, error: message || 'Có lỗi trong quá trình thực thi' };
        }

        return response.data;
      },
      async (error: AxiosError) => {
        const config = error.config;
        const resError = error.response;
        const dataError: any = resError && resError.data;
        const Auth = await import('@/configs/auth');

        switch (resError?.status) {
          case 500:
            return errorCallback(500, dataError?.message || 'Có lỗi trong quá trình thực thi');
          case 401:
            // Handle if token is refreshing
            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then(() => {
                  if (config) return api(config);
                })
                .catch((err) => {
                  return Promise.reject(err);
                });
            }
            isRefreshing = true;

            const accessToken = await Auth.getRefreshToken();
            if (accessToken) {
              isRefreshing = false;
              processQueue(null, accessToken);
              if (config) return api(config);
            }

            return Promise.reject(error);
          default:
            return errorCallback(500, (resError && dataError?.message) || 'Có lỗi trong quá trình thực thi');
        }
      }
    );
    return api;
  }
}

export default ApiClient;
