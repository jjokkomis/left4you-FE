"use client";

import * as S from './style';
import { useRouter } from 'next/navigation';

export default function Setting() {
    const router = useRouter();

    return (
        <S.Container>
            <S.Title>마이페이지</S.Title>
            <S.Wrapper>
                <S.SubTitle>이때동안 선물 한 코스</S.SubTitle>
                <S.Box onClick={() => router.push('/review')} />
                <S.Box onClick={() => router.push('/review')} />
            </S.Wrapper>
            <S.Wrapper>
                <S.SubTitle>이때동안 선물 받은 코스</S.SubTitle>
                <S.Box onClick={() => router.push('/review')} />
                <S.Box onClick={() => router.push('/review')} />
            </S.Wrapper>
        </S.Container>
    );
}