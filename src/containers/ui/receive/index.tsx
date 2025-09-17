"use client";

import { useState, useCallback } from 'react';
import * as S from './style';
import Btn from '@/components/ui/button/button';
import Image from 'next/image';
import KakaoMap from '@/components/layout/map/kakaoMap';
import { REGIONS, Region } from '@/types/receive';
import { useClaimCourse, useGetGiftData } from '@/hooks/useReceive';
import { useGetSurvey } from '@/hooks/useSurvey';
import { mapSurveyThemeEmotion } from '@/types/survey';

export default function ReceiveContainer() {
  const [region, setRegion] = useState<Region>('서울');
  const [started, setStarted] = useState(false);
  const [excludeId, setExcludeId] = useState<number | undefined>(undefined);

  const { data: surveyData } = useGetSurvey();
  const { themes, emotions } = mapSurveyThemeEmotion(surveyData);
  const emotionText = emotions[0] || '누군가를 떠올리며';
  const themeText = themes[0] || '조용한 서점';

  const handleSelect = useCallback((r: Region) => {
    setRegion(r);
    setExcludeId(undefined);
  }, []);
  const { data, isLoading, refetch, isFetching } = useGetGiftData(region, { enabled: started, excludeCourseId: excludeId });
  const { mutate: claim } = useClaimCourse();

  const handleReceive = () => {
    if (!started) {
      setStarted(true);
    } else {
      refetch();
    }
  };

  const handleRetry = () => {
    if (data?.courseId) setExcludeId(data.courseId);
    refetch();
  }

  const handleClaim = () => {
    claim({ region, courseId: data?.courseId });
  }

  const handleShare = async () => {
    if (!data?.courseId) return;

    const shareData = {
      title: `${data.name} - 선물받은 코스`,
      text: `${region}에서 발견한 특별한 코스를 공유합니다!`,
      url: `${window.location.origin}/course/${data.courseId}`,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('코스 링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('공유 실패:', error);
      // 대체 방법: URL만 클립보드에 복사
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('코스 링크가 클립보드에 복사되었습니다!');
      } catch (clipboardError) {
        console.error('클립보드 복사 실패:', clipboardError);
        alert('공유에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  }

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
    const periods = ['오전', '오후', '저녁'] as const;
    return (
      <S.Wrapper>
        <h2>선물받은 나의 코스</h2>
        <KakaoMap height="150px" onSelectLocation={() => { }} />
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
        <S.ButtonGroup>
          <Btn onClick={handleClaim}>코스 받기</Btn>
          <S.ShareButton onClick={handleShare}>공유하기</S.ShareButton>
          <S.RetryButton onClick={handleRetry}>코스 다시받기</S.RetryButton>
        </S.ButtonGroup>
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