"use client";

import * as S from "./style";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyGifts } from "@/services/course";
import useCourse from "@/hooks/useCourse";
import type { CourseGift, CourseReview } from "@/types/types";

export default function Setting() {
  const router = useRouter();
  const { courseList } = useCourse();
  const [gifts, setGifts] = useState<CourseGift[]>([]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const data = await getMyGifts();
        setGifts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("받은 코스 불러오기 실패:", error);
      }
    };
    fetchGifts();
  }, []);

  const courses = Array.isArray(courseList) ? courseList.slice(0, 10) : [];

  return (
    <S.Container>
      <S.Title>마이페이지</S.Title>
      <S.Wrapper>
        <S.SubTitle>내가 만든 코스</S.SubTitle>
        {courses.length > 0 ? (
          courses.map((course: CourseReview) => (
            <S.Box
              key={course.id}
              onClick={() =>
                alert("내가 만든 코스는 리뷰를 작성할 수 없습니다.")
              }
            >
              <S.CourseName>{course.name}</S.CourseName>
            </S.Box>
          ))
        ) : (
          <p>만든 코스가 없습니다.</p>
        )}
      </S.Wrapper>
      <S.Wrapper>
        <S.SubTitle>선물 받은 코스</S.SubTitle>
        {gifts.length > 0 ? (
          gifts.map((gift) => (
            <S.Box
              key={gift.id}
              onClick={() => router.push(`/review/${gift.course_id}`)}
            >
              <S.CourseName>{gift.course_name}</S.CourseName>
            </S.Box>
          ))
        ) : (
          <p>받은 코스가 없습니다.</p>
        )}
      </S.Wrapper>
    </S.Container>
  );
}