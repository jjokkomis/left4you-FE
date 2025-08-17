"use client";

import * as S from "./style";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Btn from "@/components/ui/button/button";
import useCourse from "@/hooks/useCourse";
import { useState } from "react";

export default function ReviewPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const { courseDetail, isDetailLoading } = useCourse(Number(params.id));

    const [rating, setRating] = useState(courseDetail?.course?.rating || 0);
    const title = courseDetail?.course?.content.split("\n")[0] || "";
    const body = courseDetail?.course?.content.split("\n").slice(1).join("\n") || "";

    if (isDetailLoading) return <div>로딩 중...</div>;
    if (!courseDetail?.course) return <div>코스를 불러오지 못했습니다.</div>;

    const handleSubmit = () => {
        alert(`코스 리뷰가 작성되었습니다.`);
        router.push("/setting");
    };

    return (
        <S.Container>
        <S.Img onClick={() => router.back()}>
            <Image
            src="/assets/back-button.svg"
            alt="back"
            width={20}
            height={20}
            style={{ pointerEvents: "none" }}
            />
        </S.Img>
        <S.Wrapper>
            <S.Title>
            이 코스는 어땠나요?<br />리뷰와 별점을 남겨주세요
            </S.Title>
            <S.SubTitle>별점은 큰 힘이 됩니다</S.SubTitle>
        </S.Wrapper>
        <S.StarWrapper>
            {[1, 2, 3, 4, 5].map((n) => (
            <S.Star key={n} onClick={() => setRating(n)}>
                {n <= rating ? "★" : "☆"}
            </S.Star>
            ))}
        </S.StarWrapper>
        <S.Wrapper>
            <S.Title>리뷰 작성</S.Title>
            <S.ReviewTitle placeholder="리뷰 제목을 적어주세요" defaultValue={title} />
            <S.Review placeholder="리뷰를 작성해주세요" maxLength={130} defaultValue={body} />
        </S.Wrapper>
        <Btn onClick={handleSubmit}>리뷰작성</Btn>
        </S.Container>
    );
}