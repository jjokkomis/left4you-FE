import customAxios from "@/lib/customAxios";
import type { CreateCourse, Response, UpdateCourse } from "@/types/types";

const createCourse = async (
    data: CreateCourse
    ): Promise<Response> => {
    const response = await customAxios.post<Response>("/course/create", data);
    return response.data;
};

async function getCourseList() {
    const response = await customAxios.get("/course/list");
    return response.data;
}

async function getCourseReviewList() {
    const response = await customAxios.get("/course/review");
    return response.data;
}

const updateCourse = async (
    data: UpdateCourse
    ): Promise<Response> => {
    const response = await customAxios.put<Response>("/course/update", data);
    return response.data;
};

const getCourseById = async (course_id: number) => {
    const response = await customAxios.get<Response>(`/course/${course_id}`);
    return response.data;
};

export { createCourse, getCourseList, getCourseReviewList, updateCourse, getCourseById };
export default createCourse;
