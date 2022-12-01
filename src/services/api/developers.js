import instance from './auth';

export const getPersonaInfo = async () => {
  const { data } = await instance.get(`/developers`);
  return data;
};
