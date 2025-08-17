"use client";

import * as S from './style';
import { useRouter } from 'next/navigation';
import useCourse from "@/hooks/useCourse";
import { useEffect, useState } from "react";
import { getCourseGift } from "@/services/course";
import type { CourseGift, CourseReview } from "@/types/types";

export default function Setting() {
    const router = useRouter();
    const { courseList: data } = useCourse();
    const [receivedCourses, setReceivedCourses] = useState<CourseGift[]>([]);

    useEffect(() => {
        async function fetchReceivedCourses() {
        const courseId = data?.courses?.[0]?.id;
        if (!courseId) return;
        const res = await getCourseGift(courseId);
        setReceivedCourses(res.courses || []);
        }
        fetchReceivedCourses();
    }, [data?.courses]);

    return (
        <S.Container>
        <S.Title>마이페이지</S.Title>

        <S.Wrapper>
            <S.SubTitle>이때동안 만든 코스</S.SubTitle>
            {data?.courses?.map((course: CourseReview) => (
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
            {receivedCourses.map((course: CourseGift) => (
            <S.Box
                key={course.id}
                onClick={() => router.push(`/review/${course.course_id}`)}
            >
                <S.CourseName>{course.course_name}</S.CourseName>
            </S.Box>
            ))}
        </S.Wrapper>
        </S.Container>
    );
}