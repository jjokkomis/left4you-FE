export interface StepProps {
    currentStep: number;
    onNext: () => void;
    onPrev: () => void;
}
export interface MapProps {
    onSelectLocation: (lat: number, lng: number, address: string) => void;
    center?: { lat: number; lng: number };
}

export interface KakaoMapHandle {
    moveToAddress: (address: string) => void;
    moveToLatLng: (lat: number, lng: number) => void;
}

export interface MapProps {
    onSelectLocation: (lat: number, lng: number, address: string) => void;
    center?: { lat: number; lng: number };
    height?: number | string;
}

export interface LocationState {
    address: string;
    coord: {
        latitude: number;
        longitude: number;
    } | null;
}

export type Location = {
    address: string;
    coord: {
        lat: number | null;
        lng: number | null;
    };
};

export interface CreateCourse {
    maker_id: string;
    name: string;
    content: string;
    rating: number;
    place_name: string;
    latitude: number;
    longitude: number;
}

export interface Response {
    success: boolean;
    courseId?: number;
    error?: string;
}

export type CourseData = {
    course_id: number;
    course_name: string;
    latitude?: number;
    longitude?: number;
};


export interface BtnProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export interface CreateCourse {
    maker_id: string;
    name: string;
    content: string;
    rating: number;
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

export interface CoursePayload {
    course: {
        maker_id: number;
        name: string;
        content: string;
        rating: number;
    };
    place: {
        course_id?: number; 
        place_name: string;
        latitude: number;
        longitude: number;
    };
}

export interface CourseReview {
    course_id: number;
    course_name: string;
    isMine?: boolean;
}

export interface UpdateCourse {
    course_id: number;
    title: string;
    body: string;
    rating: number;
}