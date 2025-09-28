"use client";

import * as S from "./style";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";

export default function ReviewPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  const { courseDetail, isDetailLoading, reviewTitle, setReviewTitle, reviewBody, setReviewBody, rating, setRating, handleSubmitReview, canAccessCurrentCourse, isAccessChecking, courseList } = useCourse(courseId);

  if (isDetailLoading || isAccessChecking) return <div>로딩 중...</div>;

  if (!canAccessCurrentCourse) {
    // 접근 권한 없음: 안내 후 홈으로 이동
    if (typeof window !== "undefined") {
      alert("이 코스에 접근할 권한이 없습니다.");
      router.back();
    }
    return null;
  }

  if (!courseDetail?.course) return <div>코스를 불러오지 못했습니다.</div>;

  type CourseListItem = { id: number };
  const isMyCourse = courseList?.some((course: CourseListItem) => course.id === courseId);

  return (
    <S.Container>
      <S.Img onClick={() => router.back()}>
        <Image
          src="/assets/back-button.svg"
          alt="back"
          width={20}
          height={20}
          style={{ pointerEvents: "none" }}
        />
      </S.Img>

      <S.Wrapper>
        <S.Title>
          {isMyCourse
            ? "내가 만든 코스는 리뷰 작성이 불가합니다."
            : "이 코스는 어땠나요?\n리뷰와 별점을 남겨주세요"}
        </S.Title>
        {!isMyCourse && <S.SubTitle>별점은 큰 힘이 됩니다</S.SubTitle>}
      </S.Wrapper>

      {!isMyCourse && (
        <>
          <S.StarWrapper>
            {[1, 2, 3, 4, 5].map((n) => (
              <S.Star key={n} onClick={() => setRating(n)}>
                {n <= rating ? "★" : "☆"}
              </S.Star>
            ))}
          </S.StarWrapper>

          <S.Wrapper>
            <S.Title>리뷰 작성</S.Title>
            <S.ReviewTitle
              placeholder="리뷰 제목"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            <S.Review
              placeholder="리뷰 작성"
              maxLength={130}
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
            />
          </S.Wrapper>
          <Btn onClick={handleSubmitReview}>리뷰작성</Btn>
        </>
      )}
    </S.Container>
  );
}