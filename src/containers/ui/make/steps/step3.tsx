"use client";

import { useState, useEffect } from "react";
import * as S from "../style";
import Btn from "@/components/ui/button/button";
import { getCourseList } from "@/services/course";
import type { CourseData } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Step3() {
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        getCourseList()
            .then((data) => {
                if (data.success) {
                    setCourses(data.courses);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSaveAndRedirect = () => {
        alert("저장이 성공적으로 완료되었습니다.");
        router.push("/");
    };

    if (loading) return <S.Loading>로딩 중...</S.Loading>;

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>카드 미리보기</S.Title>
            </S.Wrapper>
            <S.Map>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <S.Overlay key={course.course_id}>
                            <S.CourseTitle>{course.course_name}</S.CourseTitle>
                            <S.Location>📍 출발지 ~ 도착지</S.Location>
                        </S.Overlay>
                    ))
                ) : (
                    <S.Overlay>코스 정보가 없습니다.</S.Overlay>
                )}
            </S.Map>
            <S.Wrapper>
                <S.Title>코스 이름</S.Title>
                <S.Box>
                    {courses.length > 0
                        ? courses.map((course) => (
                                <div key={course.course_id}>{course.course_name}</div>
                            ))
                        : "로딩 중..."}
                </S.Box>
            </S.Wrapper>
            <S.BtnGap>
                <Btn onClick={handleSaveAndRedirect}>생성완료</Btn>
            </S.BtnGap>
        </S.Container>
    );
}