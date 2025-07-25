import * as S from "./style";
import Image from "next/image";

export default function Recommand() {
    return (
        <S.Wrapper>
            <S.First>
                <Image src="src/assets/gift.svg" alt="gift🎁" width={180} height={160} />
                <S.TextGroup>
                    <S.Title variant="first"> 남들은 만들지 못하는, <br /> 나만의 여행코스 만들기 </S.Title>
                    <S.SubTitle variant="first">코스 만들러 가기 &gt;</S.SubTitle>
                </S.TextGroup>
            </S.First>
            <S.Second>
                <Image src="src/assets/flower.svg" alt="flower🌹" width={180} height={160} />
                <S.TextGroup>
                    <S.Title variant="second"> 내가 만든 코스를 <br /> 다른 사람에게 선물해요</S.Title>
                    <S.SubTitle variant="second">만든 코스 공유하기 &gt;</S.SubTitle>
                </S.TextGroup>
            </S.Second>
        </S.Wrapper>
    );
}