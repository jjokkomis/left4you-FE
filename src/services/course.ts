import customAxios from "@/lib/customAxios";
import type { CreateCourseRequest, CreateCourseResponse } from "@/types/types";

const createCourse = async (
    data: CreateCourseRequest
    ): Promise<CreateCourseResponse> => {
    const response = await customAxios.post<CreateCourseResponse>("/course/create", data);
    return response.data;
};

async function getCourseList() {
    const response = await customAxios.get("/course/list");
    return response.data;
}

export { createCourse, getCourseList };
export default createCourse;
