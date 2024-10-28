import { APIClient } from '@/Services/Network/axios/APIClient'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export class APIBuilder {
  constructor(url: string) {
    this.client = new APIClient(url)
  }

  client: APIClient

  attachRequestInterceptor(
    onFullfill: (
      request: InternalAxiosRequestConfig<any>,
    ) => InternalAxiosRequestConfig<any>,
  ): APIBuilder {
    this.client.api.interceptors.request.use(onFullfill)
    return this
  }

  attachResponseInterceptor(
    onFulfilled:
      | ((
          response: AxiosResponse<any, any>,
        ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>)
      | null,
    onError: ((error: any) => any) | null = null,
  ): APIBuilder {
    this.client.api.interceptors.response.use(onFulfilled, onError)
    return this
  }

  setTimeout(timeoutMilliseconds: number): APIBuilder {
    this.client.api.defaults.timeout = timeoutMilliseconds
    return this
  }

  build(): APIClient {
    return this.client
  }
}
