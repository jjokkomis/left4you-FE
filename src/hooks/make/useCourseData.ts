import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Location } from "@/types/types";

export const useCourseData = () => {
    const [courseName, setCourseName] = useState("");
    const [author, setAuthor] = useState("");
    const [locations, setLocations] = useState<{ A: Location; B: Location }>({
        A: { address: "위치 A", coord: null },
        B: { address: "위치 B", coord: null },
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const { data, error } = await supabase
                    .from("course_make")
                    .select("*")
                    .order("id", { ascending: false })
                    .limit(1)
                    .single();

                if (error || !data) {
                    console.error(error);
                    return;
                }

                const content = JSON.parse(data.content);

                if (content.locations?.length === 2) {
                    setLocations({
                        A: { address: "위치 A", coord: content.locations[0] },
                        B: { address: "위치 B", coord: content.locations[1] },
                    });
                }

                setCourseName(data.name || "코스 이름 없음");
                setAuthor(data.maker_id || "익명");
            } catch (e) {
                console.error(e);
            }
        };

        fetchCourseData();
    }, []);

    return { courseName, author, locations };
};