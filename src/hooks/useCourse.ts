// useCourse.ts
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { KakaoMapHandle, LocationState, CourseGift } from "@/types/types";
import { createCourse, getCourseList, getCourseById, addCourseReview, getAllReview } from "@/services/course";

export default function useCourse(courseId?: number) {
    const [courseName, setCourseName] = useState("");
    const [selected, setSelected] = useState<"A" | "B">("A");
    const [locations, setLocations] = useState<{ A: LocationState; B: LocationState }>({
        A: { address: "", coord: null },
        B: { address: "", coord: null },
    });
    const [receivedCourses, setReceivedCourses] = useState<CourseGift[]>([]);
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

    const createMutation = useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            alert("코스를 성공적으로 등록했습니다!");
            refetch();
        },
        onError: (err: Error) => console.error(err.message),
    });

    const addReviewMutation = useMutation({
        mutationFn: ({ title, body, score }: { title: string; body: string; score: number }) =>
            addCourseReview({ course_id: courseId!, title, body, score }),
        onSuccess: () => {
            alert("리뷰 작성 완료!");
            router.push('/review');
        },
        onError: (err: Error) => {
            console.error(err.message);
            alert("리뷰 작성 중 오류 발생");
        },
    });

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, address: string) =>
            setLocations((prev) => ({ ...prev, [selected]: { address, coord: { latitude: lat, longitude: lng } } })),
        [selected]
    );

    const handleInput = useCallback(
        (e: React.FormEvent<HTMLDivElement>, course: "A" | "B") => {
            const address = e.currentTarget.textContent || "";
            setLocations((prev) => ({ ...prev, [course]: { ...prev[course], address } }));
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
        courseName,
        setCourseName,
        selected,
        setSelected,
        locations,
        handleSelectLocation,
        handleInput,
        mapRef,
        inputRefs,
        handleSaveData,
        isLoading,
        courseList,
        courseListError: error,
        courseDetail,
        isDetailLoading,
        reviews,
        isReviewLoading,
        addReviewMutation,
        receivedCourses,
        refetchReviews,
    };
}