"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import Btn from "@/components/ui/button/button";
import useCourseChoice from "@/hooks/useCourse";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Step1() {
    const {
        courseName, setCourseName,
        selected, setSelected,
        locations, handleSelectLocation,
        handleInput, mapRef,
        inputRefs, handleSaveData,
        coords, tourItems, tourLoading, tourError
    } = useCourseChoice();

    const [showTourList, setShowTourList] = useState(false);

    useEffect(() => {
        if (coords) setShowTourList(true);
    }, [coords]);

    return (
        <S.Container>
        <S.Wrapper>
            <S.Title>코스 이름</S.Title>
            <S.CourseName
            placeholder="코스 이름을 입력해주세요"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            />
        </S.Wrapper>

        <S.MapWrapper>
            <KakaoMap onSelectLocation={handleSelectLocation} ref={mapRef} />
        </S.MapWrapper>

        <S.MyLocationGroup>
            <Image src="/assets/Barrow.svg" alt="화살표 아이콘" width={10} height={10} />
            {locations[selected]?.address || "위치를 선택해주세요."}
        </S.MyLocationGroup>

        <S.Group>
            {["A", "B"].map((course) => (
            <S.CourseInput
                key={course}
                type="text"
                placeholder="주소를 입력해주세요."
                value={locations[course as "A" | "B"]?.address || ""}
                onChange={(e) => handleInput(e, course as "A" | "B")}
                onClick={() => setSelected(course as "A" | "B")}
                ref={inputRefs[course as "A" | "B"]}
            />
            ))}
        </S.Group>

        <S.ButtonGroup>
            <Btn onClick={handleSaveData}>위치등록</Btn>
            <S.ToggleBtn onClick={() => setShowTourList(prev => !prev)}>
            {showTourList ? "추천 관광지 닫기" : "추천 관광지 보기"}
            </S.ToggleBtn>
        </S.ButtonGroup>

        {showTourList && (
            <S.TourListWrapper>
            <S.Title>추천 관광지</S.Title>
            {tourLoading && <S.Sub>불러오는 중...</S.Sub>}
            {tourError && <S.Sub>관광지 데이터를 불러오는데 실패했어요.</S.Sub>}
            {!tourLoading && !tourError && tourItems?.length > 0 && (
                <ul>
                {tourItems.map((item: any) => (
                    <li key={item.contentid}>{item.title}</li>
                ))}
                </ul>
            )}
            {!tourLoading && !tourError && (!tourItems || tourItems.length === 0) && (
                <S.Sub>주변에 추천 관광지가 없습니다.</S.Sub>
            )}
            </S.TourListWrapper>
        )}
        </S.Container>
    );
}