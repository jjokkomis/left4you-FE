import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mapX = searchParams.get("mapX");
    const mapY = searchParams.get("mapY");
    const radius = searchParams.get("radius") ?? "5000";

    if (!mapX || !mapY) {
      return NextResponse.json({ error: "mapX, mapY 필요" }, { status: 400 });
    }

    const serviceKey = process.env.TOUR_API_KEY;
    const url = `http://apis.data.go.kr/B551011/KorService2/locationBasedList2?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&mapX=${mapX}&mapY=${mapY}&radius=${radius}`;

    const response = await fetch(url);
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      console.error("공공데이터 응답 파싱 실패:", text);
      return NextResponse.json({ error: "공공데이터 API 파싱 실패", raw: text }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}