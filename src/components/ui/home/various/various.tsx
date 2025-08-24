import { useRouter } from 'next/navigation';
import * as S from './style';
import Image from "next/image";

export default function Various() {
    const router = useRouter();

    return (
        <S.Container>
            <S.Wrapper onClick={() => router.push('/receive')} style={{ cursor: 'pointer' }}>
                <Image src="/assets/bloom.svg" alt="bloom💐" width={50} height={50} />
                <S.TextGroup>
                    <S.Title>선물받기</S.Title>
                    <S.SubTitle>
                        다른사람이 만든 코스를 <br /> 선물 받아 여행을 떠나요
                    </S.SubTitle>
                </S.TextGroup>
                <S.Btn>
                    <Image src="/assets/arrow.svg" alt="arrow" width={30} height={30} />
                </S.Btn>
            </S.Wrapper>

            <S.Wrapper onClick={() => router.push('/map')} style={{ cursor: 'pointer' }}>
                <Image src="/assets/location.svg" alt="location📚" width={50} height={50} />
                <S.TextGroup>
                    <S.Title>위치보기</S.Title>
                    <S.SubTitle>
                        현재 여행 중인 곳의 <br /> 위치를 확인해요
                    </S.SubTitle>
                </S.TextGroup>
                <S.Btn>
                    <Image src="/assets/arrow.svg" alt="arrow" width={30} height={30} />
                </S.Btn>
            </S.Wrapper>
        </S.Container>
    );
}