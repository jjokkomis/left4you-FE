"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import Btn from "@/components/ui/button/button";
import useCourseChoice from "@/hooks/useCourse";
import Image from "next/image";
import createCourse from "@/services/course";

export default function Step1() {
    const { courseName, setCourseName, selected, setSelected, locations, handleSelectLocation, handleInput, mapRef, inputRefs } = useCourseChoice();

    const handleSaveData = async () => {
        const data = {
            maker_id: "1",
            name: courseName,
            content: {
                coordA: {
                    lat: locations["A"]?.coord?.lat ?? 0,
                    lng: locations["A"]?.coord?.lng ?? 0,
                },
                coordB: {
                    lat: locations["B"]?.coord?.lat ?? 0,
                    lng: locations["B"]?.coord?.lng ?? 0,
                },
            },
            rating: 3,
            message: "사용자가 생성한 코스입니다.",
        };

        const response = await createCourse(data);

        if (response.success) {
            console.log("코스 ID:", response.courseId);
            alert("코스가 성공적으로 등록되었습니다!");
        } else {
            alert("코스 등록 실패: " + response.message);
        }
    };

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
                    >
                        {locations[course as "A" | "B"].address}
                    </S.Course>
                ))}
            </S.Group>
            <Btn onClick={handleSaveData}>위치등록</Btn>
        </S.Container>
    );
}