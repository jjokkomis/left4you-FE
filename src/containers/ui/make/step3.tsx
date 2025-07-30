import * as S from './style';

export default function Step2() {
    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>카드 미리보기</S.Title>
            </S.Wrapper>
            <S.Map />
            <S.Wrapper>
                <S.Title> 코스 이름 </S.Title>
                <S.CourseName>한강 나들이</S.CourseName>
            </S.Wrapper>
        </S.Container>
    );
}