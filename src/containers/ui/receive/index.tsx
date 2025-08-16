"use client";

import { useState, useCallback } from 'react';
import * as S from './style';
import Btn from '@/components/ui/button/button';
import Image from 'next/image';
import KakaoMap from '@/components/layout/map/kakaoMap';
import { REGIONS, Region } from '@/types/receive';
import { useGetGiftData } from '@/hooks/useReceive';
import { useGetSurvey } from '@/hooks/useSurvey';
import { mapSurveyThemeEmotion } from '@/types/survey';

export default function ReceiveContainer() {
  const [region, setRegion] = useState<Region>('서울');
  const [started, setStarted] = useState(false);

  const { data: surveyData } = useGetSurvey();
  const { themes, emotions } = mapSurveyThemeEmotion(surveyData);
  const emotionText = emotions[0] || '누군가를 떠올리며';
  const themeText = themes[0] || '조용한 서점';

  const handleSelect = useCallback((r: Region) => setRegion(r), []);
  const { data, isLoading, refetch, isFetching } = useGetGiftData(region, { enabled: started });

  const handleReceive = () => {
    if (!started) {
      setStarted(true);
    } else {
      refetch();
    }
  };

  if (isLoading || isFetching) {
    return (
      <S.Wrapper>
        <S.LoadingView>
          <Image src="/assets/icons/presentHand.svg" alt="Loading" width={54} height={54} />
          <S.LoadingText>선물 받는 중</S.LoadingText>
        </S.LoadingView>
      </S.Wrapper>
    );
  }

  if (data) {
    const periods = ['오전','오후','저녁'] as const;
    return (
      <S.Wrapper>
        <h2>선물받은 나의 코스</h2>
        <KakaoMap height="150px" />
        <S.DayFlow>
          <S.FlowTitle>{data.name}</S.FlowTitle>
          {data.courses.map((c, idx) => (
            <S.PeriodBlock key={idx}>
              <S.PeriodHeading>{periods[idx]}</S.PeriodHeading>
              <S.PlaceWrapper>
                <S.PlaceHeader>
                  <span>📍 {c.location}</span>
                </S.PlaceHeader>
                <S.PlaceHeaderBottom>
                  <span>{c.place}</span>
                </S.PlaceHeaderBottom>
                <S.PlaceDescription dangerouslySetInnerHTML={{ __html: c.description }} />
              </S.PlaceWrapper>
              {idx < data.courses.length - 1 && <S.SectionDivider />}
            </S.PeriodBlock>
          ))}
        </S.DayFlow>
        <Btn onClick={() => alert('코스 상세 이동 TODO')}>코스 보러가기</Btn>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <h2>선물 받기</h2>
      <S.SelectedRegionBar>{region}</S.SelectedRegionBar>
      <S.RegionBlock>
        <S.RegionList>
          {REGIONS.map(r => (
            <S.RegionButton key={r} selected={region === r} onClick={() => handleSelect(r)}>{r}</S.RegionButton>
          ))}
        </S.RegionList>
      </S.RegionBlock>

      <S.Hero bgSrc={'/assets/heroBg.png'}>
        <S.HeroContent>
          <S.HeroLine>
            <span>{region}</span><S.HeroLine dimmed as="span">에서</S.HeroLine>
          </S.HeroLine>
          <S.HeroLine>{emotionText}</S.HeroLine>
          <S.HeroLine>
            <span>{themeText + ' '}</span><S.HeroLine dimmed as="span">느낌 나는</S.HeroLine>
          </S.HeroLine>
          <S.HeroLine dimmed>코스를 찾아요.</S.HeroLine>
        </S.HeroContent>
      </S.Hero>

      <Btn onClick={handleReceive}>선물받기</Btn>
    </S.Wrapper>
  );
}