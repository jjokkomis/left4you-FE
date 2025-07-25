import * as S from './style';
import Image from 'next/image';

export default function Recommand(){
    return (
        <S.Container>
            <Image src="/assets/gift.svg" alt="gift" width={200} height={200} />
            <S.TextGroup>
                <S.Title>남들은 만들지 못하는, <br /> 나만의 여행코스 만들기</S.Title>
                <S.SubTitle>코스 만들러 가기 &gt;</S.SubTitle>
            </S.TextGroup>
        </S.Container>
    )
}