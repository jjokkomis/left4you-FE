import type { TourItem } from '@/types/types'

export async function getTourItems(lat: number, lng: number, radius = 5000): Promise<TourItem[]> {
  try {
    const serviceKey = process.env.NEXT_PUBLIC_TOUR_API_KEY;
    if (!serviceKey) {
      throw new Error("Tour API key가 설정되지 않았습니다.");
    }

    const apiUrl = `https://apis.data.go.kr/B551011/KorService2/locationBasedList2?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&mapX=${lng}&mapY=${lat}&radius=${radius}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const proxyData = await response.json();

    const parsed = JSON.parse(proxyData.contents);
    return parsed.response?.body?.items?.item ?? [];
  } catch (error) {
    console.error("관광지 API 호출 에러:", error);
    throw error;
  }
}