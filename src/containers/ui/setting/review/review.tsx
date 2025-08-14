"use client";

import * as S from './style';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Btn from '@/components/ui/button/button';

export default function ReviewPage() {
    const router = useRouter();
    const [count, setR] = useState(0);

    return (
        <S.Container>
            <Image src="assets/back-button.svg" alt="review📝" width={20} height={20} onClick={() => router.back()}/>
            <S.Wrapper>
                <S.Title> 이 코스는 어땠나요? <br /> 리뷰와 별점을 남겨주세요 </S.Title>
                <S.SubTitle> 별점은 큰 힘이 됩니다 </S.SubTitle>
            </S.Wrapper>
            <S.Star>
                {[1,2,3,4,5].map(n =>
                    <S.Star key={n} onClick={() => setR(n)}>
                    {n <= count ? "★" : "☆"}
                    </S.Star>
                )}
            </S.Star>
            <S.Wrapper>
                <S.Title>리뷰 작성</S.Title>
                <S.ReviewTitle placeholder='리뷰 제목을 적어주세요'/>
                <S.Review placeholder='리뷰를 작성해주세요'/>
            </S.Wrapper>
            <Btn> 리뷰작성 </Btn>
        </S.Container>
    );
}