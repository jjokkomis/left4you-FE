import { create } from "zustand";

export interface Location {
    lat: number;
    lng: number;
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

interface CourseState {
    courses: Course[];
    selectedCourse: Course | null;
    setCourses: (courses: Course[]) => void;
    addCourse: (course: Course) => void;
    selectCourse: (course: Course) => void;
    clearSelectedCourse: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    selectedCourse: null,

    setCourses: (courses) =>
        set(() => ({
        courses,
        })),

    addCourse: (course) =>
        set((state) => ({
        courses: [...state.courses, course],
        })),

    selectCourse: (course) =>
        set(() => ({
        selectedCourse: course,
        })),

    clearSelectedCourse: () =>
        set(() => ({
        selectedCourse: null,
    })),
}));