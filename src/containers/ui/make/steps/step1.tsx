"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import Btn from "@/components/ui/button/button";
import useCourseChoice from "@/hooks/useCourse";
import Image from "next/image";

export default function Step1() {
    const { courseName, setCourseName, selected, setSelected, locations, handleSelectLocation, handleInput, mapRef, inputRefs, handleSaveData } = useCourseChoice();

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
            <KakaoMap onSelectLocation={handleSelectLocation} ref={mapRef} />
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
            <Btn onClick={handleSaveData}>위치등록</Btn>
        </S.Container>
    );
}