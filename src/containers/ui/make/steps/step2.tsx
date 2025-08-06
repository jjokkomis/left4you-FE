"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import useCourse from "@/hooks/useCourse";

export default function Step2() {
    const { courseList: data, isCourseListLoading: isLoading, courseListError: error } = useCourse();

    if (isLoading) return <S.Loading>로딩 중...</S.Loading>;
    if (error || !data?.success || data.courses.length === 0) return <S.Loading>에러 발생 또는 코스 없음</S.Loading>;

    const course = data.courses[0];
    const coord = { lat: course.latitude, lng: course.longitude };

    return (
        <S.Container>
        <S.Wrapper>
            <S.Title>코스 미리보기</S.Title>
            <S.Pack>
            <S.PreviewTitle>{course.course_name || "코스 이름 없음"}</S.PreviewTitle>
            <S.Name>익명</S.Name>
            </S.Pack>
        </S.Wrapper>
        <KakaoMap center={coord} onSelectLocation={() => {}} />
        <S.Group>
            {["A", "B"].map((key) => (
            <S.Course key={key}>
                위치 {key} ({coord.lat.toFixed(4)}, {coord.lng.toFixed(4)})
            </S.Course>
            ))}
        </S.Group>
        </S.Container>
    );
}