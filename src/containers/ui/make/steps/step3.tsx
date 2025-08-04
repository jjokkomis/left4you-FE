"use client";

import * as S from "../style";
import Btn from "@/components/ui/button/button";
import { useCourseCard } from "@/hooks/make/useCourseCard";

export default function Step3() {
    const { course, message, loading, error, start, end, setMessage, saveMessage } = useCourseCard();

    if (loading) return <S.Loading>로딩 중...</S.Loading>;
    if (error) return <S.Loading>에러 발생: {error}</S.Loading>;

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>카드 미리보기</S.Title>
            </S.Wrapper>
            <S.Map>
                {course && (
                    <S.Overlay>
                        <S.CourseTitle>{course.name}</S.CourseTitle>
                        <S.Location>
                            📍{start?.lat && start?.lng ? "출발지" : ""} ~{" "}
                            {end?.lat && end?.lng ? "도착지" : ""}
                        </S.Location>
                        <S.Message>{message || "상대방에게 하고 싶은 한마디"}</S.Message>
                    </S.Overlay>
                )}
            </S.Map>
            <S.Wrapper>
                <S.Title>코스 이름</S.Title>
                <S.Box>{course ? course.name : "로딩 중..."}</S.Box>
            </S.Wrapper>
            <S.Wrapper>
                <S.Title>상대방에게 하고 싶은 한마디</S.Title>
                <S.MessageInput
                    placeholder="상대방에게 하고 싶은 메시지를 입력해주세요."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </S.Wrapper>
            <S.BtnGap>
                <Btn onClick={saveMessage}>생성완료</Btn>
            </S.BtnGap>
        </S.Container>
    );
}