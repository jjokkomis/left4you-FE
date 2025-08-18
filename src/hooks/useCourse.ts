import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { KakaoMapHandle, LocationState, CourseGift } from "@/types/types";
import { createCourse, getCourseList, getCourseById, addCourseReview, getAllReview, getLastReview } from "@/services/course";

export default function useCourse(courseId?: number, userId?: number) {
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
    const inputRefs = { 
        A: useRef<HTMLInputElement>(null), 
        B: useRef<HTMLInputElement>(null) 
    };

    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!userId) return;
        getAllReview(userId).then(gifts => setReceivedCourses(gifts || []));
    }, [userId]);

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

    const { data: latestReview } = useQuery({
        queryKey: ["latestReview", courseId],
        queryFn: () => getLastReview(courseId!),
        enabled: !!courseId,
    });

    useEffect(() => {
        const latest = latestReview?.latestReview;
        if (latest) {
            const lines = latest.content.split("\n");
            setReviewTitle(lines[0] || "");
            setReviewBody(lines.slice(1).join("\n") || "");
            setRating(latest.score ?? 0);
        } else if (courseDetail?.course && rating === 0) {
            setRating(courseDetail.course.score ?? 0);
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
        mutationFn: ({ title, body, score, author_id }: { title: string; body: string; score: number; author_id: number }) =>
            addCourseReview({ course_id: courseId!, title, body, score, author_id }),
        onSuccess: () => {
            alert("리뷰 작성 완료!");
            router.push("/setting");
            queryClient.invalidateQueries({ queryKey: ["latestReview", courseId] });
            refetchReviews();
        },
    });

    const handleSubmitReview = useCallback(() => {
        if (!rating) return alert("별점을 선택해주세요.");
            
        const tempAuthorId = 3;
        addReviewMutation.mutate({
            title: reviewTitle,
            body: reviewBody,
            score: rating,
            author_id: tempAuthorId,
        });
    }, [reviewTitle, reviewBody, rating, addReviewMutation]);

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, address: string) =>
            setLocations(prev => ({
                ...prev,
                [selected]: { address, coord: { latitude: lat, longitude: lng } },
            })),
        [selected]
    );

    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, course: "A" | "B") => {
            const address = e.target.value;
            setLocations(prev => ({
                ...prev,
                [course]: { ...prev[course], address },
            }));
            mapRef.current?.moveToAddress(address);
        },
        []
    );

    const handleSaveData = useCallback(() => {
        const loc = locations[selected];
        if (!courseName || !loc?.address || !loc?.coord) return alert("코스명과 위치를 입력해주세요.");

        const { latitude, longitude } = loc.coord;
        createMutation.mutate({
            maker_id: userId || 2,
            name: courseName,
            content: "",
            rating: 2,
            place_name: loc.address,
            latitude,
            longitude,
        });
    }, [courseName, selected, locations, createMutation, userId]);

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
        addReviewMutation, reviewTitle, setReviewTitle,
        reviewBody, setReviewBody,
        rating, setRating,
        handleSubmitReview, receivedCourses, refetchReviews,
    };
}