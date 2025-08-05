import { useState, useEffect } from "react";
import { getCourseList } from "@/services/course";
import type { CourseData } from "@/types/types";

export const useCourseCard = () => {
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [course, setCourse] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
        setLoading(true);
        setError(null);

        const data = await getCourseList();
        setCourses(data.courses);
        if (data.courses.length > 0) {
            setCourse(data.courses[0]);
        }

        setLoading(false);
        };

        fetchCourses();
    }, []);

    return {
        courses,
        course,
        loading,
        error,
        setCourse,
    };
};