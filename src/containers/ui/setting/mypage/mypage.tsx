"use client";

import * as S from './style';
import { useRouter } from 'next/navigation';
import useCourse from "@/hooks/useCourse";
import { useEffect, useState } from "react";
import { getCourseReviewList } from "@/services/course";
import type { CourseReview } from "@/types/types";

export default function Setting() {
    const router = useRouter();
    const { courseList: data } = useCourse();

    const [, setReceivedCourses] = useState<CourseReview[]>([]);

    useEffect(() => {
        async function fetchReceivedCourses() {
            try {
                const res = await getCourseReviewList();
                setReceivedCourses(res.courses || []);
            } catch (error) {
                console.error("선물 받은 코스 불러오기 실패:", error);
            }
        }
        fetchReceivedCourses();
    }, []);

    return (
        <S.Container>
            <S.Title>마이페이지</S.Title>
            <S.Wrapper>
                <S.SubTitle>이때동안 만든 코스</S.SubTitle>
                {data?.courses?.map((course) => (
                    <S.Box
                        key={course.id}
                        onClick={() => router.push(`/review/${course.id}`)}
                    > 
                        <S.CourseName>{course.name}</S.CourseName>
                    </S.Box>
                ))}
            </S.Wrapper>
            <S.Wrapper>
                <S.SubTitle>이때동안 선물 받은 코스</S.SubTitle>
                <S.Box onClick={() => router.push('/review')} />
                <S.Box onClick={() => router.push('/review')} />
            </S.Wrapper>
        </S.Container>
    );
}