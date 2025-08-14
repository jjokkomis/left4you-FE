"use client";

import { useState, useCallback } from 'react';
import * as S from './style';
import Btn from '@/components/ui/button/button';
import Image from 'next/image';
import KakaoMap from '@/components/layout/map/kakaoMap';

const REGIONS = ['서울','부산','대구','인천','광주','제주','대전','경기','울산','세종'] as const;

type Region = typeof REGIONS[number];

interface Course {
  location: string;
  place: string;
  description: string;
}

interface GiftData {
  name: string;
  courses: Course[];
}

const fakeData: GiftData = {
  name: '한강 공원 힐링 & 야경 명소 투어',
  courses: [
    {
      location: '뚝섬 -> 반포',
      place: '뚝섬한강공원',
      description: '윈도서핑, 수상싀 등으로 수정레저 체험<br />공원산책로, 장미정원, 음악분수도 전망 포인트로 참고<br />점심으로 공원 주변 포장마차에서 식사'
    },
    {
      location: '공원',
      place: '선유도',
      description: '옛 정수장 재생, 생태 산책로 산책',
    },
    {
      location: '반포공원 & 달빛무지개분수',
      place: '반포한강공원',
      description: '세게에서 가장 긴 교량 분수로 기네스에 등재<br />여름 21:30분까지 분수쇼 진행<br />푸드트럭과 카페도 있어 분위기 있는 야경데이트 가능',
    }
  ]
}

export default function ReceiveContainer() {
  const [region, setRegion] = useState<Region>('서울');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GiftData | null>(null);

  const emotion = '누군가를 떠올리며';
  const theme = '조용한 서점';

  const handleSelect = useCallback((r: Region) => setRegion(r), []);

  const fakeRequest = (): Promise<GiftData> => new Promise(res => {
    setTimeout(() => res(fakeData), 1800);
  });

  const handleReceive = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await fakeRequest();
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.LoadingView>
          <Image src="/assets/icons/presentHand.svg" alt="Loading" width={54} height={54} />
          <S.LoadingText>선물 받는 중</S.LoadingText>
        </S.LoadingView>
      </S.Wrapper>
    );
  }

  if (result) {
    // fakeData 사용해서 시간대 매핑
    const periods = ['오전','오후','저녁'] as const;
    return (
      <S.Wrapper>
        <h2>선물받은 나의 코스</h2>
        <KakaoMap height="150px" />
        <S.DayFlow>
          <S.FlowTitle>{fakeData.name}</S.FlowTitle>
          {fakeData.courses.map((c, idx) => (
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
              {idx < fakeData.courses.length - 1 && <S.SectionDivider />}
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
          <S.HeroLine>{emotion}</S.HeroLine>
          <S.HeroLine>
            <span>{theme + ' '}</span><S.HeroLine dimmed as="span">느낌 나는</S.HeroLine>
          </S.HeroLine>
          <S.HeroLine dimmed>코스를 찾아요.</S.HeroLine>
        </S.HeroContent>
      </S.Hero>

      <Btn onClick={handleReceive}>선물받기</Btn>
    </S.Wrapper>
  );
}