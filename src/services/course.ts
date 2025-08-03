export interface Location {
    lat: number;
    lng: number;
}

export interface CourseData {
    maker_id: string;
    name: string;
    content: {
        locations: Location[];
    };
    rating: number;
}

export const fetchCourses = async (): Promise<CourseData[]> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/courses`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createCourse = async (courseData: CourseData): Promise<CourseData> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/course`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};