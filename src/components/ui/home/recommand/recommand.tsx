import { useRouter } from 'next/navigation';
import * as S from "./style";
import Image from "next/image";

export default function Recommand() {
    const router = useRouter();

    return (
        <S.Wrapper>
            <S.First onClick={() => router.push('/make')} style={{cursor: 'pointer'}}>
                <Image src="assets/gift.svg" alt="gift🎁" width={180} height={160} />
                <S.TextGroup>
                    <S.Title variant="first"> 남들은 만들지 못하는, <br /> 나만의 여행코스 만들기 </S.Title>
                    <S.SubTitle variant="first">코스 만들러 가기 <Image src="assets/Warrow.svg" alt="arrow" width={10} height={10} /> </S.SubTitle>
                </S.TextGroup>
            </S.First>
            <S.Second onClick={() => router.push('/setting')}>
                <Image src="assets/flower.svg" alt="flower🌹" width={180} height={160} />
                <S.TextGroup>
                    <S.Title variant="second"> 내가 만든 코스를 <br /> 다른 사람에게 선물해요</S.Title>
                    <S.SubTitle variant="second">만든 코스 공유하기 <Image src="assets/Barrow.svg" alt="arrow" width={10} height={10} /></S.SubTitle>
                </S.TextGroup>
            </S.Second>
        </S.Wrapper>
    );
}