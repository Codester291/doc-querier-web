import createApiClient from './config-2'

export const baseUrl = 'http://localhost:5300'

export const login = async (payload: {
  email: string
  password: string
}) => {
  return await createApiClient(false).post(`/auth`, payload);
}

export const makeFormSubmission = async (payload: unknown) => {
  return await createApiClient(false).post(`/user/register`, payload)
}

export const fetchUserFiles = async () => {
  return await createApiClient(true, false).get(`/api/v1/hub/fetch`);
}

export const uploadFile = async (payload: unknown) => {
  return await createApiClient(true, true).post(`/user/file/upload`, payload);
}

export const queryDoc = async (payload: unknown) => {
  return await createApiClient(true, false).post(`/user/file/query`, payload);
}