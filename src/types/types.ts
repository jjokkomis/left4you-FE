export interface StepProps {
    currentStep: number;
    onNext: () => void;
    onPrev: () => void;
}
export interface KakaoMapHandle {
    moveToAddress: (address: string) => void;
}

export interface Location {
    address: string;
    coord: {
        lat: number | null;
        lng: number | null;
    } | null;
}

export interface CourseData {
    name: string;
    content: string;
    message?: string;
    id: string;
}
export interface BtnProps {
    children: React.ReactNode;
    onClick?: () => void;
}

// course.ts
interface Coordinates {
    lat: number;
    lng: number;
}

export interface Content {
    coordA: Coordinates;
    coordB: Coordinates;
}

export interface CreateCourse {
    maker_id: string;
    name: string;
    content: Content;  
    rating: number;
    message: string;
}

export interface Response {
    success: boolean;
    courseId?: string;
    message?: string;
}

// store/course.ts
export interface CourseState {
    courses: Course[];
    selectedCourse: Course | null;
    setCourses: (courses: Course[]) => void;
    addCourse: (course: Course) => void;
    selectCourse: (course: Course) => void;
    clearSelectedCourse: () => void;
}

export interface Course {
    id: number;
    maker_id: string;
    name: string;
    content: {
        locations: Location[];
    };
    rating: number;
}

// hooks/useCourse.ts
type LocationCoord = { lat: number; lng: number } | null;
export type LocationState = {
    address: string;
    coord: LocationCoord;
};