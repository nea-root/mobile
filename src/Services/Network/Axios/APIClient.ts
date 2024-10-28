import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class APIClient {
  constructor(url: string) {
    this.api = axios.create({
      baseURL: url,
      responseType: 'json',
      withCredentials: true,
    })
  }

  api: AxiosInstance

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<R> {
    return this.api.get(url, config)
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.api.post(url, data, config)
  }

  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.api.put(url, data, config)
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.api.delete(url, config)
  }

  postFormURLEncoded<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    const qs = require('qs')
    return this.api.post(url, qs.stringify(data), {
      ...{
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      },
      ...config,
    })
  }
}
