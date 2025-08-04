"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import Btn from "@/components/ui/button/button";
import useCourseMaker from "@/hooks/make/useCourseChoice";
import Image from "next/image";

export default function Step1() {
    const { courseName, setCourseName, selected, setSelected, locations, handleSelectLocation, handleInput, mapRef, inputRefs, saveData } = useCourseMaker();

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
            {locations[selected].address || "선택한 위치가 없습니다."}
        </S.MyLocationGroup>
        <S.Group>
            {["A", "B"].map((course) => (
            <S.Course
                key={course}
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                onInput={(e) => handleInput(e, course as "A" | "B")}
                onClick={() => setSelected(course as "A" | "B")}
                ref={inputRefs[course as "A" | "B"]}
            />
        ))}
        </S.Group>
        <Btn onClick={saveData}>위치등록</Btn>
        </S.Container>
    );
}