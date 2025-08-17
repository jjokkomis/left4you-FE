"use client";

import * as S from "./style";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";
import { useState, useRef, useEffect } from "react";

export default function ReviewPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const courseId = Number(id);
    const { courseDetail, isDetailLoading, addReviewMutation } = useCourse(courseId);

    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        if (courseDetail?.course && rating === 0) setRating(courseDetail.course.score);
    }, [courseDetail, rating]);

    if (isDetailLoading) return <div>로딩 중...</div>;
    if (!courseDetail?.course) return <div>코스를 불러오지 못했습니다.</div>;

    const handleSubmit = () => {
        if (!rating) return alert("별점을 선택해주세요.");
        addReviewMutation.mutate({
            title: titleRef.current?.value || "",
            body: bodyRef.current?.value || "",
            score: rating
        });
    };

    return (
        <S.Container>
            <S.Img onClick={() => router.back()}>
                <Image src="/assets/back-button.svg" alt="back" width={20} height={20} style={{ pointerEvents: "none" }} />
            </S.Img>
            <S.Wrapper>
                <S.Title>이 코스는 어땠나요?<br />리뷰와 별점을 남겨주세요</S.Title>
                <S.SubTitle>별점은 큰 힘이 됩니다</S.SubTitle>
            </S.Wrapper>
            <S.StarWrapper>
                {[1, 2, 3, 4, 5].map(n => (
                    <S.Star key={n} onClick={() => setRating(n)}>
                        {n <= (rating ?? 0) ? "★" : "☆"}
                    </S.Star>
                ))}
            </S.StarWrapper>
            <S.Wrapper>
                <S.Title>리뷰 작성</S.Title>
                <S.ReviewTitle placeholder="리뷰 제목" ref={titleRef} />
                <S.Review placeholder="리뷰 작성" maxLength={130} ref={bodyRef} />
            </S.Wrapper>
            <Btn onClick={handleSubmit}>리뷰작성</Btn>
        </S.Container>
    );
}