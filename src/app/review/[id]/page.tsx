"use client";

import { useParams, useRouter } from "next/navigation";
import Review from "@/containers/ui/setting/review/review";
import useCourse from "@/hooks/useCourse";
import { useEffect } from "react";

export default function ReviewPage() {
  const params = useParams<{ id: string }>();
  const reviewId = Number(params.id);
  const router = useRouter();
  const { isLoading, courseList, receivedCourses } = useCourse();

  const isCourseAccessible = (id: number) => {
    const myCourseIds = courseList.map(c => c.id);
    const giftCourseIds = receivedCourses.map(g => g.course_id);
    return myCourseIds.includes(id) || giftCourseIds.includes(id);
  };

  useEffect(() => {
    if (!isLoading && !isCourseAccessible(reviewId)) {
      alert("접근할 수 없는 코스입니다.");
      router.replace("/setting");
    }
  }, [reviewId, isLoading, courseList, receivedCourses, router]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!isCourseAccessible(reviewId)) return null;

  return <Review reviewId={reviewId} />;
}