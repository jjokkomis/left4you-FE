<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import { getCourseList } from "@/services/course";

export default function Step2() {
    const [courseName, setCourseName] = useState("코스 이름 없음");
    const [author, setAuthor] = useState("익명");
    const [locations, setLocations] = useState({
        A: { address: "위치 A", coord: { lat: 0, lng: 0 } },
        B: { address: "위치 B", coord: { lat: 0, lng: 0 } },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourseList().then((res) => {
        const lastCourse = res.courses[0];
        const content = typeof lastCourse.content === "string" ? JSON.parse(lastCourse.content) : lastCourse.content;
        setLocations({
            A: { address: "위치 A", coord: content.coordA },
            B: { address: "위치 B", coord: content.coordB },
        });
        setCourseName(lastCourse.name);
        setAuthor(lastCourse.maker_id);
        setLoading(false);
        });
    }, []);

    if (loading) return <S.Container>로딩 중...</S.Container>;

    return (
        <S.Container>
        <S.Wrapper>
            <S.Title>코스 미리보기</S.Title>
            <S.Pack>
            <S.PreviewTitle>{courseName}</S.PreviewTitle>
            <S.Name>{author}</S.Name>
            </S.Pack>
        </S.Wrapper>
        <KakaoMap center={locations.A.coord ?? undefined} onSelectLocation={() => {}} />
        <S.Group>
            {Object.entries(locations).map(([key, location]) => (
            <S.Course key={key}>
                {location.address} (
                {location.coord
                ? `${location.coord.lat.toFixed(4)}, ${location.coord.lng.toFixed(4)}`
                : "좌표 없음"}
                )
            </S.Course>
            ))}
        </S.Group>
=======
"use client";

import { useState, useEffect } from "react";
import * as S from "../style";
import Btn from "@/components/ui/button/button";
import { getCourseList } from "@/services/course";
import type { CourseData } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Step3() {
    const [course, setCourse] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        getCourseList()
            .then((data) => setCourse(data.courses[0] || null))
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
>>>>>>> 69ce132 (fix(#23) :: 훅 정리)
        </S.Container>
    );
}