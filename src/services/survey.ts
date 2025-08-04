import customAxois from '@/lib/customAxios';


import { Survey } from '@/types/survey';

export async function getSurvey(): Promise<Survey> {
  const res = await customAxois.get<Survey>("/survey");
  return res.data;
}

export async function createSurvey() {
  const res = await customAxois.post<Survey>("/survey");
  return res.data;
}