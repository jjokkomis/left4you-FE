"use client";

import { useParams } from "next/navigation";
import Review from "@/containers/ui/setting/review/review";
import useCourse from "@/hooks/useCourse";

export default function ReviewPage() {
  return <Review />;
}