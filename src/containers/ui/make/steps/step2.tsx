import * as S from '../style';
import KakaoMap from '@/components/layout/map/kakaoMap';

export default function Step2() {
    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>코스 미리보기</S.Title>
                <S.Pack>
                    <S.PreviewTitle> 한강 나들이 </S.PreviewTitle>
                    <S.Name>기몌빈</S.Name>
                </S.Pack>
                <S.Star> 4.0 ★★★★☆ </S.Star>
            </S.Wrapper>
            <KakaoMap />
            <S.Group>
                <S.Course>한강 공원</S.Course>
                <S.Course>롯데월드타워</S.Course>
            </S.Group>
        </S.Container>
    );
}
