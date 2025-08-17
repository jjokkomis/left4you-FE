"use client";

import { useParams } from "next/navigation";
import Review from "@/containers/ui/setting/review/review";

export default function ReviewPage() {
    const params = useParams<{ id: string }>();
    const reviewId = Number(params.id);

    return <Review reviewId={reviewId} />;
}
