import customAxois from '@/lib/customAxios';


import { Survey, SurveySubmission } from '@/types/survey';

export async function getSurvey(): Promise<Survey> {
  const res = await customAxois.get<Survey>("/survey");
  return res.data;
}

export async function createSurvey(surveyResult: SurveySubmission): Promise<void> {
  await customAxois.post<Survey>("/survey", surveyResult);
}