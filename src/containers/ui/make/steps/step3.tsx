"use client";

import * as S from "../style";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";
import { useRouter } from "next/navigation";

export default function Step3() {
    const router = useRouter();
    const { courseList, isLoading, courseListError: error } = useCourse();

    if (isLoading) return <S.Loading>로딩 중...</S.Loading>;
    if (error || !courseList || courseList.length === 0)
        return <S.Loading>에러 발생 또는 코스 없음</S.Loading>;

    const course = courseList[0];
    const firstPlace = course.places?.[0];
    const lastPlace = course.places?.slice(-1)[0];

    const handleSaveAndRedirect = () => {
        alert("저장이 성공적으로 완료되었습니다.");
        router.push("/");
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>카드 미리보기</S.Title>
            </S.Wrapper>

            <S.Map>
                <S.Overlay>
                    <S.CourseTitle>{course.name || "코스 이름 없음"}</S.CourseTitle>
                    <S.Location>
                        📍 {firstPlace?.place_name || "출발지"} ~ {lastPlace?.place_name || "도착지"}
                    </S.Location>
                </S.Overlay>
            </S.Map>

            <S.Wrapper>
                <S.Title>코스 이름</S.Title>
                <S.Box>
                    <div>{course.name || "코스 이름 없음"}</div>
                </S.Box>
            </S.Wrapper>

            <S.BtnGap>
                <Btn onClick={handleSaveAndRedirect}>생성완료</Btn>
            </S.BtnGap>
        </S.Container>
    );
}