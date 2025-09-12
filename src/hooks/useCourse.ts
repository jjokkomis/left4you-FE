import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { KakaoMapHandle, LocationState, CourseGift } from "@/types/types";
import { createCourse, getCourseList, getCourseById, addCourseReview, getAllReview, getLastReview, getMyGifts } from "@/services/course";
import { useUserStore } from "@/store/useUserStore";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "@/types/auth";
import useTourItems from "@/hooks/useTourItems";

async function fetchTourItem() {
    const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
    const url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList";

    const params = new URLSearchParams({
        ServiceKey: TOUR_API_KEY || "",
        MobileOS: "ETC",
        MobileApp: "GiftTrip",
        _type: "json",
        areaCode: "8",
        sigunguCode: "1",
        contentTypeId: "12",
        numOfRows: "1",
    });

    try {
        const resp = await fetch(`${url}?${params.toString()}`);
        if (!resp.ok) throw new Error("Tour API 요청 실패");

        const data = await resp.json();
        const tourItem = data?.response?.body?.items?.item ?? {};

        console.log("반환 데이터:", tourItem);
        return tourItem;
    } catch (error) {
        console.error( error);
        return {};
    }
}

export default function useCourse(courseId?: number) {
    const [courseName, setCourseName] = useState("");
    const [selected, setSelected] = useState<"A" | "B">("A");
    const [locations, setLocations] = useState<{ A: LocationState; B: LocationState }>({
        A: { address: "", coord: null },
        B: { address: "", coord: null },
    });
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [receivedCourses, setReceivedCourses] = useState<CourseGift[]>([]);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState<number>(0);

    const [areaCode, setAreaCode] = useState("8");
    const [sigunguCode, setSigunguCode] = useState("1");

    const mapRef = useRef<KakaoMapHandle | null>(null);
    const inputRefs = { A: useRef<HTMLInputElement>(null), B: useRef<HTMLInputElement>(null) };

    const router = useRouter();
    const queryClient = useQueryClient();

    const user = useUserStore((state) => state.user);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const decodedUserId = useMemo(() => {
        if (!token) return undefined;
        try { return jwtDecode<JwtPayload>(token).user_id; } catch { return undefined; }
    }, [token]);
    const userId = user?.id ?? decodedUserId;

    const { data: gifts } = useQuery<CourseGift[], Error>({
    const { data: gifts, isLoading: isGiftsLoading } = useQuery<CourseGift[], Error>({
        queryKey: ["myGifts"],
        queryFn: async () => {
            const res = await getMyGifts();
            return Array.isArray(res) ? res : [];
        },
        enabled: !!token,
    });

    useEffect(() => { if (Array.isArray(gifts)) setReceivedCourses(gifts); }, [gifts]);

    const { data, refetch } = useQuery({
        queryKey: ["courseList", userId],
        queryFn: () => (userId ? getCourseList(userId) : Promise.resolve([])),
        enabled: !!userId,
        staleTime: 0,
    });
    const courseList = Array.isArray(data) ? data : data?.courses ?? [];

    const { data: courseDetail } = useQuery({
        queryKey: ["courseDetail", courseId, userId],
        queryFn: () => (courseId ? getCourseById(courseId) : Promise.resolve(null)),
        enabled: !!courseId,
    });

    const { data: reviews, refetch: refetchReviews } = useQuery({
        queryKey: ["courseReviews", courseId, userId],
        queryFn: () => (courseId && userId ? getAllReview(courseId) : Promise.resolve([])),
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

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            setCoords({ lat, lng });

            const kakao = (window as any).kakao;
            if (!kakao?.maps?.services) return;

            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(lng, lat, (result: any, status: string) => {
                if (status === kakao.maps.services.Status.OK) {
                    const region = result.find((r: any) => r.region_type === "H");
                    if (region) {
                        setAreaCode(region.region_1depth_code);
                        setSigunguCode(region.region_2depth_code);
                    }
                }
            });
        });
    }, []);

    const { items: tourItems, loading: tourLoading, error: tourError } = useTourItems(
        coords?.lat ?? null,
        coords?.lng ?? null
    );

    const createMutation = useMutation({
        mutationFn: async (data: { maker_id: number; name: string; content: string; rating: number; place_name: string; latitude: number; longitude: number }) => {
            return createCourse({ ...data, content: JSON.stringify(tourItems ?? []) });

            const tourItem = await fetchTourItem();
            return createCourse({
                ...data,
                content: JSON.stringify(tourItem),
            });
        },
        onSuccess: () => {
            alert("코스를 등록하였습니다");
            refetch();
        },
        onSuccess: () => { alert("코스를 등록하였습니다"); refetch(); },
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
        addReviewMutation.mutate({ title: reviewTitle, body: reviewBody, score: rating });
    }, [reviewTitle, reviewBody, rating, addReviewMutation, userId]);

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, address: string) => {
            setLocations(prev => ({ ...prev, [selected]: { address, coord: { latitude: lat, longitude: lng } } }));
            setCoords({ lat, lng });
        },
        [selected]
    );

    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, course: "A" | "B") => {
            const address = e.target.value;
            setLocations(prev => ({ ...prev, [course]: { ...prev[course], address } }));
            mapRef.current?.moveToAddress(address);
        },
        []
    );

    const handleSaveData = useCallback(() => {
        if (!userId) return alert("사용자 정보가 없습니다.");
        const loc = locations[selected];
        if (!courseName || !loc?.address || !loc?.coord) return alert("코스명과 위치를 입력해주세요.");
        const { latitude, longitude } = loc.coord;
        createMutation.mutate({ maker_id: userId, name: courseName, content: "", rating: 2, place_name: loc.address, latitude, longitude });
    }, [courseName, selected, locations, createMutation, userId]);

    const isCourseAccessible = useCallback(
        (id: number) => {
            const myCourseIds = (courseList as Array<{ id: number }>).map(c => c.id);
            const receivedCourseIds = Array.isArray(gifts) ? (gifts as Array<{ course_id: number }>).map(c => c.course_id) : [];
            return myCourseIds.includes(id) || receivedCourseIds.includes(id);
        },
        [courseList, gifts]
    );

    const canAccessCurrentCourse = courseId ? isCourseAccessible(courseId) : true;

    return {
        courseName, setCourseName,
        selected, setSelected,
        locations, handleSelectLocation,
        handleInput, mapRef,
        inputRefs, handleSaveData,
        isLoading: false, courseList,
        courseListError: null,
        courseDetail, isDetailLoading: false,
        reviews, isReviewLoading: false,
        latestReview: latestReview?.latestReview,
        addReviewMutation, reviewTitle, setReviewTitle,
        reviewBody, setReviewBody,
        rating, setRating,
        handleSubmitReview, receivedCourses,
        isCourseAccessible, canAccessCurrentCourse,
        isAccessChecking: false,
        areaCode, sigunguCode,
        tourItems, tourLoading, tourError,
        coords,
    };
}