"use client";

import { useParams, useRouter } from "next/navigation";
import * as S from "./style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";

export default function CourseDetailPage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params?.id ? Number(params.id) : null;

    const { courseData, loading } = useCourse(courseId);

    if (!courseId) return <p>잘못된 코스 ID입니다.</p>;
    if (loading) return <p>로딩 중...</p>;
    if (!courseData) return <p>코스를 불러올 수 없습니다.</p>;

    const periods = ["오전", "오후", "저녁"] as const;

    return (
        <S.Wrapper>
            <h2>선물받은 나의 코스</h2>
            <KakaoMap height="150px" onSelectLocation={() => { }} />

            {courseData.courses?.map((c, idx) => (
                <S.PeriodBlock key={c.id || `period-${idx}`}>
                    <S.PeriodHeading>{periods[idx]}</S.PeriodHeading>
                    <S.PlaceWrapper>
                        <S.PlaceHeader>
                            <span>📍 {c.location}</span>
                        </S.PlaceHeader>
                        <S.PlaceHeaderBottom>
                            <span>{c.place}</span>
                        </S.PlaceHeaderBottom>
                        <S.PlaceDescription
                            dangerouslySetInnerHTML={{ __html: c.description }}
                        />
                    </S.PlaceWrapper>
                    {idx < (courseData.courses?.length ?? 0) - 1 && <S.SectionDivider />}
                </S.PeriodBlock>
            ))}
            <Btn onClick={() => router.push(`/review/${courseData.id}`)}>리뷰작성</Btn>
        </S.Wrapper>
    );
}