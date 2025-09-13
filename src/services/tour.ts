interface TourItem {
    contentid: string;
    title: string;
    addr1?: string;
    mapx?: string;
    mapy?: string;
    firstimage?: string;
    tel?: string;
}

interface TourApiResponse {
    response: {
        body: {
            items: {
                item: TourItem[];
            };
            totalCount: number;
        };
    };
}

export async function getTourItems(lat: number, lng: number, radius = 5000): Promise<TourItem[]> {
    try {
        const serviceKey = process.env.NEXT_PUBLIC_TOUR_API_KEY;
        if (!serviceKey) {
            throw new Error('Tour API key가 설정되지 않았습니다.');
        }

        const url = `http://apis.data.go.kr/B551011/KorService2/locationBasedList2?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&mapX=${lng}&mapY=${lat}&radius=${radius}`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const text = await response.text();
        
        try {
            const data: TourApiResponse = JSON.parse(text);
            return data.response?.body?.items?.item ?? [];
        } catch {
            console.error("공공데이터 응답 파싱 실패:", text);
            throw new Error("공공데이터 API 파싱 실패");
        }
    } catch (error) {
        console.error("관광지 API 호출 에러:", error);
        throw error;
    }
}
