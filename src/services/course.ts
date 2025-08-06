import customAxios from "@/lib/customAxios";
import type { CreateCourse, Response } from "@/types/types";

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

export { createCourse, getCourseList };
export default createCourse;
