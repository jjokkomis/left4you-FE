import customAxois from '@/lib/customAxios';
import { GiftData, Region, REGION_CODE } from '@/types/receive';

export async function getGiftData(region: Region): Promise<GiftData> {
  const regionCode = REGION_CODE[region];
  const res = await customAxois.get<GiftData>(`/receive/recommend/${regionCode}`);
  return res.data;
}