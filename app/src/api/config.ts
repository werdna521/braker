const baseUrl = '/api/v1';

export type APIResponse<T> = {
  status: number;
  data?: T;
  message?: string;
};

export default {
  url: {
    authenticate: `${baseUrl}/auth/authenticate`,
    signOut: `${baseUrl}/auth/sign-out`,
    superman: `${baseUrl}/auth/superman`,
    getAllPost: `${baseUrl}/post/get-all`,
    createPost: `${baseUrl}/post/create`
  },
  headers: {
    commons: {
      'Content-Type': 'application/json'
    }
  },
  empty: {
    status: 500,
    message: 'Mysterious error'
  }
};