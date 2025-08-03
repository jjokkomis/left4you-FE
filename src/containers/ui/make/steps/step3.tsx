"use client";

import { useEffect, useState } from "react";
import * as S from "../style";
import Btn from "@/components/ui/button/button";
import { supabase } from "@/lib/supabaseClient";
import type { CourseData } from "@/types/types";

export default function Step3() {
    const [course, setCourse] = useState<CourseData | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchLastCourse = async () => {
            const { data, error } = await supabase
                .from("course_make")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(1);

            if (error) console.error(error.message);
            else if (data && data.length > 0) {
                setCourse(data[0]);
                setMessage(data[0].message || ""); 
            }
        };

        fetchLastCourse();
    }, []);

    const parsedLocations = course?.content
        ? JSON.parse(course.content)?.locations
        : null;

    const start = parsedLocations?.[0];
    const end = parsedLocations?.[1];

    const handleSaveMessage = async () => {
        if (!course) return;

        const { error } = await supabase
            .from("course_make")
            .update({ message })
            .eq("id", course.id);

        if (error) alert(error.message);
        else alert("메시지가 성공적으로 저장되었습니다.");
    };

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
                <Btn onClick={handleSaveMessage}>생성완료</Btn>
            </S.BtnGap>
        </S.Container>
    );
}