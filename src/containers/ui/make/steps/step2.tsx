"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import React, { useEffect, useState } from "react";
import { getCourseList } from "@/services/course";
import type { Location } from "@/types/types";

export default function Step2() {
    const [courseName, setCourseName] = useState("코스 이름 없음");
    const [author, setAuthor] = useState("익명");
    const [locations, setLocations] = useState<{ A: Location; B: Location }>({
        A: { address: "위치 A", coord: null },
        B: { address: "위치 B", coord: null },
    });

    useEffect(() => {
        getCourseList().then((res) => {
            if (res.success && res.courses.length > 0) {
                const lastCourse = res.courses[0];
                const content = typeof lastCourse.content === "string" ? JSON.parse(lastCourse.content) : lastCourse.content;

                setLocations({
                    A: { address: "위치 A", coord: content.coordA || null },
                    B: { address: "위치 B", coord: content.coordB || null },
                });

                setCourseName(lastCourse.name || "코스 이름 없음");
                setAuthor(lastCourse.maker_id || "익명");
            }
        });
    }, []);

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
                        {location.coord && typeof location.coord.lat === "number" && typeof location.coord.lng === "number"
                            ? `${location.coord.lat.toFixed(4)}, ${location.coord.lng.toFixed(4)}`
                            : "좌표 없음"}
                        )
                    </S.Course>
                ))}
            </S.Group>
        </S.Container>
    );
}