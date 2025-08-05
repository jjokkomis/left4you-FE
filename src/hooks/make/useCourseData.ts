import { useEffect, useState } from "react";
import { getCourseList } from "@/services/course";
import type { Location } from "@/types/types";

export const useCourseData = () => {
    const [courseName, setCourseName] = useState("");
    const [author, setAuthor] = useState("");
    const [locations, setLocations] = useState<{ A: Location; B: Location }>({
        A: { address: "위치 A", coord: null },
        B: { address: "위치 B", coord: null },
    });

    useEffect(() => {
        const fetchCourseList = async () => {
        const res = await getCourseList();

        if (res.success && res.courses.length > 0) {
            const lastCourse = res.courses[0];
            const content =
            typeof lastCourse.content === "string"
                ? JSON.parse(lastCourse.content)
                : lastCourse.content;

            if (content.coordA && content.coordB) {
            setLocations({
                A: { address: "위치 A", coord: content.coordA },
                B: { address: "위치 B", coord: content.coordB },
            });
            }

            setCourseName(lastCourse.name || "코스 이름 없음");
            setAuthor(lastCourse.maker_id || "익명");
        }
        };

        fetchCourseList();
    }, []);

    return { courseName, author, locations };
};