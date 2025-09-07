"use client";

import { useParams } from "next/navigation";
import Review from "@/containers/ui/setting/review/review";
import useCourse from "@/hooks/useCourse";

export default function ReviewPage() {
  const params = useParams<{ id: string }>();
  const reviewId = Number(params.id);

  const { isLoading } = useCourse(reviewId);

  if (isLoading) return <div>로딩 중...</div>;

  return <Review reviewId={reviewId} />;
}