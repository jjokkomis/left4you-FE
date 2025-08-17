"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import useCourse from "@/hooks/useCourse";

export default function Step2() {
    const { courseList: data, isCourseListLoading: isLoading, courseListError: error } = useCourse();

    if (isLoading) return <S.Loading>로딩 중...</S.Loading>;
    if (error || !data?.success || data.courses.length === 0)
        return <S.Loading>에러 발생 또는 코스 없음</S.Loading>;

    const course = data.courses[0];

    const coord = {
        lat: course.places?.[0]?.latitude ?? course.latitude ?? 0,
        lng: course.places?.[0]?.longitude ?? course.longitude ?? 0,
    };

    return (
        <S.Container>
        <S.Wrapper>
            <S.Title>코스 미리보기</S.Title>
            <S.Pack>
            <S.PreviewTitle>{course.name || "코스 이름 없음"}</S.PreviewTitle>
            <S.Name>익명</S.Name>
            </S.Pack>
        </S.Wrapper>

        <KakaoMap center={coord} onSelectLocation={() => {}} />

        <S.Group>
            {course.places?.length > 0 ? (
            course.places.map((place, index) => (
                <S.Course key={index}>
                위치 {String.fromCharCode(65 + index)} (
                {(place.latitude ?? 0).toFixed(4)}, {(place.longitude ?? 0).toFixed(4)}) -{" "}
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