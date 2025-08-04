import * as S from '../style';
import Btn from '@/components/ui/button/button';

export default function Step2() {
    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>카드 미리보기</S.Title>
            </S.Wrapper>
            <S.Map />
            <S.Wrapper>
                <S.Title> 코스 이름 </S.Title>
                <S.Box>한강 나들이</S.Box>
            </S.Wrapper>
            <S.BtnGap>
                <Btn>생성완료</Btn>
            </S.BtnGap>
        </S.Container>
    );
}