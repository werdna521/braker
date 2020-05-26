import config from '@/api/config';

const generateUrlWithParams = (url: string, params: any): string => {
  const arr = [];
  for (const key in params) {
    arr.push(`${key}${params[key]}`);
  }
  return `${url}${arr[0] ? '?' : ''}${arr.join('&')}`;
};

type HTTPResponse<T> = Response & { jsonData?: T };

const http = async <T>(request: RequestInfo): Promise<HTTPResponse<T>> => {
  const response: HTTPResponse<T> = await fetch(request);
  try {
    response.jsonData = await response.json();
  } catch (e) { return response; }
  return response;
};

export const get = async <T>(url: string, body: any = {}, headers: any = {}): Promise<HTTPResponse<T>> => {
  return await http<T>(new Request(generateUrlWithParams(url, body), {
    method: 'get',
    headers: {
      ...headers
    }
  }));
};

export const post = async <T>(url: string, body: any = {}, headers: any = {}): Promise<HTTPResponse<T>> => {
  return await http<T>(new Request(url, {
    method: 'post',
    headers: {
      ...headers,
      ...config.headers.commons
    },
    body: JSON.stringify(body)
  }));
};