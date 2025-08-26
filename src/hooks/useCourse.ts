import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { KakaoMapHandle, LocationState, CourseGift } from "@/types/types";
import { createCourse, getCourseList, getCourseById, addCourseReview, getAllReview, getLastReview } from "@/services/course";
import { useUserStore } from "@/store/useUserStore";

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
    const inputRefs = { A: useRef<HTMLInputElement>(null), B: useRef<HTMLInputElement>(null) };

    const router = useRouter();
    const queryClient = useQueryClient();

    const user = useUserStore((state) => state.user);
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        getAllReview(userId).then(gifts => setReceivedCourses(gifts || []));
    }, [userId]);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["courseList", userId],
        queryFn: () => userId ? getCourseList(userId) : Promise.resolve([]),
        enabled: !!userId,
        staleTime: 0,
    });
    const courseList = Array.isArray(data) ? data : data?.courses ?? [];

    const { data: courseDetail, isLoading: isDetailLoading } = useQuery({
        queryKey: ["courseDetail", courseId, userId],
        queryFn: () => (courseId && userId ? getCourseById(courseId, userId) : Promise.resolve(null)),
        enabled: !!courseId && !!userId,
    });

    const { data: reviews, isLoading: isReviewLoading, refetch: refetchReviews } = useQuery({
        queryKey: ["courseReviews", courseId, userId],
        queryFn: () => (courseId && userId ? getAllReview(courseId, userId) : Promise.resolve([])),
        enabled: !!courseId && !!userId,
    });

    const { data: latestReview } = useQuery({
        queryKey: ["latestReview", courseId, userId],
        queryFn: () => (courseId && userId ? getLastReview(courseId, userId) : Promise.resolve(null)),
        enabled: !!courseId && !!userId,
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
        mutationFn: (data: { maker_id: number; name: string; content: string; rating: number; place_name: string; latitude: number; longitude: number }) => createCourse(data),
        onSuccess: () => {
            alert("코스를 등록하였습니다");
            refetch();
        },
    });

    const addReviewMutation = useMutation({
        mutationFn: async ({ title, body, score }: { title: string; body: string; score: number }) => {
            if (!userId) throw new Error("사용자 정보가 없습니다.");
            if (!courseId) throw new Error("코스 정보가 없습니다.");
            return addCourseReview({ course_id: courseId, title, body, score, author_id: userId });
        },
        onSuccess: () => {
            alert("리뷰 작성이 완료되었습니다.");
            router.push("/setting");
            queryClient.invalidateQueries({ queryKey: ["latestReview", courseId, userId] });
            refetchReviews();
        },
    });

    const handleSubmitReview = useCallback(() => {
        if (!userId) return alert("사용자 정보가 없습니다.");
        if (!rating) return alert("별점을 선택해주세요.");
        addReviewMutation.mutate({
            title: reviewTitle,
            body: reviewBody,
            score: rating,
        });
    }, [reviewTitle, reviewBody, rating, addReviewMutation, userId, courseId]);

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
        if (!userId) return alert("사용자 정보가 없습니다.");
        const loc = locations[selected];
        if (!courseName || !loc?.address || !loc?.coord) return alert("코스명과 위치를 입력해주세요.");
        const { latitude, longitude } = loc.coord;
        createMutation.mutate({
            maker_id: userId,
            name: courseName,
            content: "",
            rating: 2,
            place_name: loc.address,
            latitude,
            longitude,
        });
    }, [courseName, selected, locations, createMutation, userId]);

    const isCourseAccessible = useCallback(
        (id: number) => {
            const myCourseIds = courseList.map(c => c.id);
            const receivedCourseIds = receivedCourses.map(c => c.course_id);
            return myCourseIds.includes(id) || receivedCourseIds.includes(id);
        },
        [courseList, receivedCourses]
    );

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
        isCourseAccessible,
    };
}