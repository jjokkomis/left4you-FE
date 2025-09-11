"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import useCourse from "@/hooks/useCourse";

export default function Step2() {
    const { courseList, isLoading, courseListError: error } = useCourse();

    if (isLoading) return <S.Loading>로딩 중...</S.Loading>;
    if (error || !courseList || courseList.length === 0)
        return <S.Loading>에러 발생 또는 코스 없음</S.Loading>;

    const course = courseList?.[0];
    const places = (course?.places ?? []) as Array<{ latitude?: number; longitude?: number; place_name?: string }>;
    const fallbackLat = typeof course?.latitude === "number" ? course.latitude : 0;
    const fallbackLng = typeof course?.longitude === "number" ? course.longitude : 0;
    const firstPlace = places[0] ?? { latitude: fallbackLat, longitude: fallbackLng };
    const coord = { lat: Number(firstPlace.latitude ?? fallbackLat), lng: Number(firstPlace.longitude ?? fallbackLng) } as { lat: number; lng: number };

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>코스 미리보기</S.Title>
                <S.Pack>
                    <S.PreviewTitle>{course?.name || "코스 이름 없음"}</S.PreviewTitle>
                    <S.Name>익명</S.Name>
                </S.Pack>
            </S.Wrapper>

            <KakaoMap center={coord} onSelectLocation={() => { }} />

            <S.Group>
                {places.length > 0 ? (
                    places.map((place, index) => (
                        <S.Course key={index}>
                            위치 {String.fromCharCode(65 + index)} (
                            {Number(place.latitude ?? fallbackLat).toFixed(4)}, {Number(place.longitude ?? fallbackLng).toFixed(4)}) -{" "}
                            {place.place_name || "이름 없음"}
                        </S.Course>
                    ))
                ) : (
                    <S.Course>
                        위치 정보 없음 ({coord.lat.toFixed(4)}, {coord.lng.toFixed(4)})
                    </S.Course>
                )}
            </S.Group>
        </S.Container>
    );
}