import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { CourseData } from "@/types/types";

export const useCourseCard = () => {
    const [course, setCourse] = useState<CourseData | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLastCourse = async () => {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from("course_make")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(1);

            if (error) {
                setError(error.message);
            } else if (data && data.length > 0) {
                setCourse(data[0]);
                setMessage(data[0].message || "");
            }
            setLoading(false);
        };

        fetchLastCourse();
    }, []);

    const saveMessage = async () => {
        if (!course) return;

        setError(null);
        const { error } = await supabase
            .from("course_make")
            .update({ message })
            .eq("id", course.id);

        if (error) setError(error.message);
        else alert("메시지가 성공적으로 저장되었습니다.");
    };

    const parsedLocations = course?.content
        ? JSON.parse(course.content)?.locations
        : null;

    const start = parsedLocations?.[0];
    const end = parsedLocations?.[1];

    return {
        course,
        message,
        loading,
        error,
        start,
        end,
        setMessage,
        saveMessage,
    };
};