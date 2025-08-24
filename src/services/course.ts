import customAxios from "@/lib/customAxios";
import type { CreateCourse, Response, UpdateCourse } from "@/types/types";

const createCourse = async (data: CreateCourse) => {
    const response = await customAxios.post("/course/create", data);
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

export const addCourseReview = async ({course_id, title, body, score, author_id}: { course_id: number; title: string; body: string; score: number; author_id: number }) => 
    await customAxios.post(`/course/${course_id}`, { title, body, score, author_id });


export const getCourseById = async (course_id: number) => {
    const response = await customAxios.get(`/course/${course_id}`);
    return response.data;
};

export const getAllReview = async (course_id: number) => {
    const response = await customAxios.get(`/course/${course_id}`);
    return response.data;
};

export const getLastReview = async (course_id: number, user_id: number) => {
    const response = await customAxios.get(`/course/${course_id}/reviews/latest`, { params: { user_id } });
    return response.data;
};

export { createCourse, getCourseList, getCourseReviewList, updateCourse };
export default createCourse;