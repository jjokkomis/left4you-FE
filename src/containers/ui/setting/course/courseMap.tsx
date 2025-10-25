"use client";

import { useParams, useRouter } from "next/navigation";
import * as S from "./style";

import KakaoMap from "@/components/layout/map/kakaoMap";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";

type CoursePeriod = {
    id?: number;
    location?: string;
    place?: string;
    description?: string;
};

export default function CourseDetailPage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params?.id ? Number(params.id) : undefined;

    const { courseData, loading } = useCourse(courseId);

    console.log("=== courseMap 디버깅 ===");
    console.log("courseId:", courseId);
    console.log("loading:", loading);
    console.log("courseData:", courseData);
    console.log("courseData.courses:", courseData?.courses);
    console.log("courses 타입:", Array.isArray(courseData?.courses));
    console.log("courses 길이:", courseData?.courses?.length);

    if (!courseId) return <p>잘못된 코스 ID입니다.</p>;
    if (loading) return <p>로딩 중...</p>;
    
    if (!courseData) {
        return (
            <S.Wrapper>
                <h2>코스 정보를 불러올 수 없습니다</h2>
                <p>코스가 존재하지 않거나 삭제되었을 수 있습니다.</p>
            </S.Wrapper>
        );
    }

    const periods = ["오전", "오후", "저녁"] as const;

    // courseData.courses[0].location에서 위치 정보 추출
    // location 형식: "37.5826, 126.983"
    const mapCenter = (() => {
        console.log("mapCenter 계산 시작");
        if (courseData.courses && courseData.courses.length > 0) {
            const firstLocation = courseData.courses[0].location;
            console.log("첫 번째 location:", firstLocation);
            if (firstLocation && typeof firstLocation === 'string') {
                const [lat, lng] = firstLocation.split(',').map(s => parseFloat(s.trim()));
                console.log("파싱된 좌표:", { lat, lng });
                if (!isNaN(lat) && !isNaN(lng)) {
                    return { lat, lng };
                }
            }
        }
        console.log("mapCenter를 찾을 수 없음");
        return undefined;
    })();

    console.log("최종 mapCenter:", mapCenter);

    return (
        <S.Wrapper>
            <h2>선물받은 나의 코스</h2>
            <KakaoMap 
                height="300px" 
                onSelectLocation={() => { }}
                center={mapCenter}
            />

            {courseData.courses && Array.isArray(courseData.courses) && courseData.courses.length > 0 ? (
                courseData.courses.map((c: CoursePeriod, idx: number) => (
                    <S.PeriodBlock key={c.id || `period-${idx}`}>
                        <S.PeriodHeading>{periods[idx] || "시간"}</S.PeriodHeading>
                        <S.PlaceWrapper>
                            <S.PlaceHeader>
                                <span>📍 {c.place || "장소 정보 없음"}</span>
                            </S.PlaceHeader>
                            <S.PlaceHeaderBottom>
                                <span>{c.location || "위치 정보 없음"}</span>
                            </S.PlaceHeaderBottom>
                            {c.description && c.description.trim() !== "" ? (
                                <S.PlaceDescription
                                    dangerouslySetInnerHTML={{ __html: c.description }}
                                />
                            ) : (
                                <S.PlaceDescription>추천 장소입니다.</S.PlaceDescription>
                            )}
                        </S.PlaceWrapper>
                        {idx < courseData.courses.length - 1 && <S.SectionDivider />}
                    </S.PeriodBlock>
                ))
            ) : (
                <div>
                    <p>이 코스가 마음에 드셨나요?</p>
                    <p>나만의 코스를 만들어보세요!</p>
                    <Btn onClick={() => router.push('/make')}>코스 만들기</Btn>
                </div>
            )}
            
            {courseData.courses && courseData.courses.length > 0 && (
                <Btn onClick={() => router.push(`/review/${courseData.id}`)}>리뷰작성</Btn>
            )}
        </S.Wrapper>
    );
}