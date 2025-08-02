'use client';

import * as S from "../style";
import Btn from "@/components/ui/button/button";
import Image from "next/image";
import KakaoMap from "@/components/layout/map/kakaoMap";

export default function Step1() {
    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>코스 이름</S.Title>
                <S.CourseName placeholder="코스 이름을 입력해주세요" />
            </S.Wrapper>
            <KakaoMap />
            <h4> <Image src="/assets/Barrow.svg" alt="arrow" width={10} height={10} /> 서울 강남구 역삼동 823-23 </h4>
            <S.Group>
                <S.Course>한강 공원</S.Course>
                <S.Course>롯데월드타워</S.Course>
            </S.Group>
            <Btn>위치등록</Btn>
        </S.Container>
    );
}