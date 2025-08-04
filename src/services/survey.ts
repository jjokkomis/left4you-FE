import customAxois from '@/lib/customAxios';

export interface Survey {
    data: [];
    count: number;
}

export async function getSurvey<Survey>() {
  const res = await customAxois.get<Survey>("/survey");
  return res.data;
}