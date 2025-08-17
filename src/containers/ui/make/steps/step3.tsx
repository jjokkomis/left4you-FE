"use client";

import * as S from "../style";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";
import { useRouter } from "next/navigation";

export default function Step3() {
    const router = useRouter();
    const { courseList: data } = useCourse();

    const handleSaveAndRedirect = () => {
        alert("저장이 성공적으로 완료되었습니다.");
        router.push("/");
    };

    const courses = data?.courses || [];

    return (
        <S.Container>
        <S.Wrapper>
            <S.Title>카드 미리보기</S.Title>
        </S.Wrapper>

        <S.Map>
            {courses.map((course) => (
            <S.Overlay key={course.id}>
                <S.CourseTitle>{course.name || "코스 이름 없음"}</S.CourseTitle>
                <S.Location>
                📍 {course.course_place?.[0]?.place_name || "출발지"} ~ {course.course_place?.slice(-1)[0]?.place_name || "도착지"}
                </S.Location>
            </S.Overlay>
            ))}
        </S.Map>

        <S.Wrapper>
            <S.Title>코스 이름</S.Title>
            <S.Box>
            {courses.map((course) => (
                <div key={course.id}>{course.name || "코스 이름 없음"}</div>
            ))}
            </S.Box>
        </S.Wrapper>

        <S.BtnGap>
            <Btn onClick={handleSaveAndRedirect}>생성완료</Btn>
        </S.BtnGap>
        </S.Container>
    );
}