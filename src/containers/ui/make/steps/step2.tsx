"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import React from "react";
import { useCourseData } from "@/hooks/make/useCourseData";

export default function Step2() {
    const { courseName, author, locations } = useCourseData();

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