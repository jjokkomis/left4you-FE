import { create } from "zustand";
import type { CourseState } from "@/types/types"

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