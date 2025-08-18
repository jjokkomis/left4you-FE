import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { KakaoMapHandle, LocationState, CourseGift } from "@/types/types";
import { createCourse, getCourseList, getCourseById, addCourseReview, getAllReview, getLastReview } from "@/services/course";

export default function useCourse(courseId?: number) {
    const [courseName, setCourseName] = useState("");
    const [selected, setSelected] = useState<"A" | "B">("A");
    const [locations, setLocations] = useState<{ A: LocationState; B: LocationState }>({
        A: { address: "", coord: null },
        B: { address: "", coord: null }
    });
    const [receivedCourses, setReceivedCourses] = useState<CourseGift[]>([]);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState<number>(0);

    const mapRef = useRef<KakaoMapHandle | null>(null);
    const inputRefs = { A: useRef<HTMLDivElement>(null), B: useRef<HTMLDivElement>(null) };
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        async function fetchReceivedCourses() {
        const userId = 2;
        const gifts = await getAllReview(userId);
        setReceivedCourses(gifts || []);
        }
        fetchReceivedCourses();
    }, []);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["courseList"],
        queryFn: getCourseList,
        staleTime: 0,
    });
    const courseList = Array.isArray(data) ? data : data?.courses || [];

    const { data: courseDetail, isLoading: isDetailLoading } = useQuery({
        queryKey: ["courseDetail", courseId],
        queryFn: () => getCourseById(courseId!),
        enabled: !!courseId,
    });

    const { data: reviews, isLoading: isReviewLoading, refetch: refetchReviews } = useQuery({
        queryKey: ["courseReviews", courseId],
        queryFn: () => getAllReview(courseId!),
        enabled: !!courseId,
    });

    const { data: latestReview, isLoading: isLatestLoading } = useQuery({
        queryKey: ["latestReview", courseId],
        queryFn: () => getLastReview(courseId!),
        enabled: !!courseId,
    });

    useEffect(() => {
        if (latestReview?.latestReview?.content) {
        const lines = latestReview.latestReview.content.split("\n");
        setReviewTitle(lines[0] || "");
        setReviewBody(lines.slice(1).join("\n") || "");
        setRating(latestReview.latestReview.score ?? courseDetail?.course.score ?? 0);
        } else if (courseDetail?.course && rating === 0) {
        setRating(courseDetail.course.score);
        }
    }, [latestReview, courseDetail]);

    const createMutation = useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
        alert("코스를 성공적으로 등록했습니다!");
        refetch();
        },
    });

    const addReviewMutation = useMutation({
        mutationFn: ({ title, body, score }: { title: string; body: string; score: number }) =>
        addCourseReview({ course_id: courseId!, title, body, score, author_id: 2 }),
        onSuccess: () => {
        alert("리뷰 작성 완료!");
        router.push("/setting");
        queryClient.invalidateQueries({ queryKey: ["latestReview", courseId] });
        refetchReviews();
        },
    });

    const handleSubmitReview = useCallback(() => {
        if (!rating) return alert("별점을 선택해주세요.");
        addReviewMutation.mutate({ title: reviewTitle, body: reviewBody, score: rating });
    }, [reviewTitle, reviewBody, rating, addReviewMutation, router]);

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, address: string) =>
        setLocations((prev) => ({
            ...prev,
            [selected]: { address, coord: { latitude: lat, longitude: lng } },
        })),
        [selected]
    );

    const handleInput = useCallback(
        (e: React.FormEvent<HTMLDivElement>, course: "A" | "B") => {
        const address = e.currentTarget.textContent || "";
        setLocations((prev) => ({
            ...prev,
            [course]: { ...prev[course], address },
        }));
        mapRef.current?.moveToAddress(address);
        },
        []
    );

    const handleSaveData = useCallback(() => {
        const loc = locations[selected];
        if (!courseName || !loc?.address || !loc?.coord) return;
        const { latitude, longitude } = loc.coord;
        if (typeof latitude !== "number" || typeof longitude !== "number") return;
        createMutation.mutate({
        maker_id: 2,
        name: courseName,
        content: "",
        rating: 2,
        place_name: loc.address,
        latitude,
        longitude,
        });
    }, [courseName, selected, locations, createMutation]);

    return {
        courseName, setCourseName,
        selected, setSelected,
        locations, handleSelectLocation,
        handleInput, mapRef,
        inputRefs, handleSaveData,
        isLoading, courseList,
        courseListError: error,
        courseDetail, isDetailLoading,
        reviews, isReviewLoading,
        latestReview: latestReview?.latestReview,
        isLatestLoading,
        addReviewMutation, reviewTitle, setReviewTitle,
        reviewBody, setReviewBody,
        rating, setRating,
        handleSubmitReview, receivedCourses, refetchReviews,
    };
}