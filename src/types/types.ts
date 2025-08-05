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
    coord: { lat: number; lng: number } | null;
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

interface Coordinates {
    lat: number;
    lng: number;
}

interface Content {
    coordA: Coordinates;
    coordB: Coordinates;
}

export interface CreateCourseRequest {
    maker_id: string;
    name: string;
    content: Content;  
    rating: number;
    message: string;
}

export interface CreateCourseResponse {
    success: boolean;
    courseId?: string;
    message?: string;
}

export interface Course {
    name: string;
    content: string;
    maker_id: string;
}

export interface CourseListResponse {
    success: boolean;
    courses: Course[];
}

export interface UpdateMessageResponse {
    success: boolean;
    message?: string;
    content?: string; 
}

export interface UpdateMessageRequest {
    course_id: number;
    new_message: string;
}

export interface UpdateMessageResponse {
    success: boolean;
    message?: string;
    courses?: Course[];
}

export interface UpdateMessageRequest {
    new_message: string;
}
