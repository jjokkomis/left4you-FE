"use client";

import * as S from "../style";
import Btn from "@/components/ui/button/button";
import { useCourseCard } from "@/hooks/make/useCourseCard";
import { useRouter } from "next/navigation";

export default function Step3() {
    const { course, loading, error } = useCourseCard();
    const router = useRouter();

    const handleSaveAndRedirect = async () => {
        alert("저장이 성공적으로 완료되었습니다.");
        router.push("/");
    };

    if (loading) return <S.Loading>로딩 중...</S.Loading>;
    if (error) return <S.Loading>에러 발생: {error}</S.Loading>;

    return (
        <S.Container>
        <S.Wrapper>
            <S.Title>카드 미리보기</S.Title>
        </S.Wrapper>
        <S.Map>
            {course ? (
            <S.Overlay>
                <S.CourseTitle>{course.name}</S.CourseTitle>
                <S.Location>📍 출발지 ~ 도착지</S.Location>
            </S.Overlay>
            ) : (
            <S.Overlay>코스 정보가 없습니다.</S.Overlay>
            )}
        </S.Map>
        <S.Wrapper>
            <S.Title>코스 이름</S.Title>
            <S.Box>{course ? course.name : "로딩 중..."}</S.Box>
        </S.Wrapper>
        <S.BtnGap>
            <Btn onClick={handleSaveAndRedirect}>생성완료</Btn>
        </S.BtnGap>
        </S.Container>
    );
    }