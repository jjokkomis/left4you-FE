"use client";

import * as S from './style';
import { useRouter } from 'next/navigation';
import useCourse from "@/hooks/useCourse";
import { useUserStore } from "@/store/useUserStore";
import type { CourseGift, CourseReview } from "@/types/types";

export default function Setting() {
    const router = useRouter();
    const { courseList, receivedCourses } = useCourse();
    const courses = Array.isArray(courseList) ? courseList.slice(0, 10) : [];

    const gifts = Array.isArray(receivedCourses) ? receivedCourses : [];

    const user = useUserStore((state) => state.user);
    console.log("현재 로그인 유저:", user);

    return (
        <S.Container>
            <S.Title>마이페이지</S.Title>
            <S.Wrapper>
                <S.SubTitle>이때동안 만든 코스</S.SubTitle>
                {courses.map((course: CourseReview) => (
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
                {gifts.length > 0 ? (
                    gifts.map((course: CourseGift) => (
                        <S.Box
                            key={course.gift_id}
                            onClick={() => router.push(`/review/${course.course_id}`)}
                        >
                            <S.CourseName>{course.course_name}</S.CourseName>
                        </S.Box>
                    ))
                ) : (
                    <p>받은 코스가 없습니다.</p>
                )}
            </S.Wrapper>
        </S.Container>
    );
}