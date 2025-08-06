"use client";

import * as S from "../style";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";
import { useRouter } from "next/navigation";

export default function Step3() {
    const router = useRouter();
    const { courseList: data, isCourseListLoading: isLoading, courseListError: error } = useCourse();

    const handleSaveAndRedirect = () => {
        alert("저장이 성공적으로 완료되었습니다.");
        router.push("/");
    };

    if (isLoading) return <S.Loading>로딩 중...</S.Loading>;
    if (error || !data?.success) return <S.Loading>에러가 발생했습니다.</S.Loading>;

    const courses = data.courses;

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>카드 미리보기</S.Title>
            </S.Wrapper>
            <S.Map>
                {courses.length > 0 && courses.map((course) => (
                    <S.Overlay key={course.course_id}>
                        <S.CourseTitle>{course.course_name}</S.CourseTitle>
                        <S.Location>📍 출발지 ~ 도착지</S.Location>
                    </S.Overlay>
                ))}
            </S.Map>
            <S.Wrapper>
                <S.Title>코스 이름</S.Title>
                <S.Box>
                    {courses.length > 0
                        ? courses.map((course) => <div key={course.course_id}>{course.course_name}</div>)
                        : "로딩 중..."}
                </S.Box>
            </S.Wrapper>
            <S.BtnGap>
                <Btn onClick={handleSaveAndRedirect}>생성완료</Btn>
            </S.BtnGap>
        </S.Container>
    );
}