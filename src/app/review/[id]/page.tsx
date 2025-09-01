"use client";

import { useParams, useRouter } from "next/navigation";
import Review from "@/containers/ui/setting/review/review";
import useCourse from "@/hooks/useCourse";
import { useEffect } from "react";

export default function ReviewPage() {
  const params = useParams<{ id: string }>();
  const reviewId = Number(params.id);
  const router = useRouter();
  
  const { isLoading, isCourseAccessible } = useCourse();

  useEffect(() => {
    if (!isLoading && !isCourseAccessible(reviewId)) {
      alert("접근할 수 없는 코스입니다.");
      router.replace("/setting");
    }
  }, [reviewId, isLoading, isCourseAccessible, router]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!isCourseAccessible(reviewId)) return null;

  return <Review reviewId={reviewId} />;
}
