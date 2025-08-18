import customAxois from '@/lib/customAxios';
import { GiftData, Region, REGION_CODE } from '@/types/receive';

export async function getGiftData(region: Region, excludeCourseId?: number): Promise<GiftData> {
  const regionCode = REGION_CODE[region];
  const res = await customAxois.get<GiftData>(`/receive/recommend/${regionCode}`, {
    params: {
      exclude_course_id: excludeCourseId,
    }
  });
  return res.data;
}

export async function claimCourse(params: {region: Region, courseId?: number}) {
  const res = await customAxois.post(`/receive/claim`, {
    region: params.region,
    course_id: params.courseId,
  });
  return res.data;
}