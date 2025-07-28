"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from './style';
import Image from "next/image";

const SCREENS = [
  {
    key: "emotion",
    icon: "/assets/icons/leaf.svg",
    title: "감정을 알아보자",
    subtitle: "이 하루를 걷고 나면 어떤 기분이면 좋겠나요?",
    options: [
      { value: "COMFORT", label: "위로", desc: "위로를 받고 싶어요" },
      { value: "HAPPY", label: "기쁨", desc: "너무 기뻐요" },
      { value: "CALM", label: "차분함", desc: "엄청 차분해요" },
      { value: "MISS", label: "누군가를 떠올리며", desc: "마음이 아려요" },
      { value: "COURAGE", label: "용기", desc: "힘이 넘쳐요" },
      { value: "WORRY", label: "생각 정리", desc: "고민이 많아요" },
    ],
  },
  {
    key: "theme",
    icon: "/assets/icons/palette.svg",
    title: "원하는 테마를 골라보자",
    subtitle: "코스를 선택할 때 어떤 주제가 좋나요?",
    options: [
      { value: "ART", label: "전시 & 예술" },
      { value: "LIBRARY", label: "조용한 서점" },
      { value: "ANIMAL", label: "반려동물과" },
      { value: "NATURAL", label: "자연" },
      { value: "MEDITATION", label: "명상" },
      { value: "HISTORY", label: "역사 & 한옥" },
      { value: "ACTIVITY", label: "활동적인" },
      { value: "WALK", label: "골목 걷기" },
    ],
  },
  {
    key: "time",
    icon: "/assets/icons/clock.svg",
    title: "원하는 코스 시간을 선택하자",
    subtitle: "얼마나 여유가 넘치는 하루인가요?",
    options: [
      { value: "HALF", label: "반나절 (2~3시간) 정도 여유가 있어요" },
      { value: "ALL", label: "하루 종일 (6~8시간) 정도 여유가 있어요" },
      { value: "NIGHT", label: "밤 산책 (저녁1시간) 정도 여유가 있어요" },
    ],
  },
  {
    key: "walk_type",
    icon: "/assets/icons/speed.svg",
    title: "원하는 강도를 선택하자",
    subtitle: "오늘 하루는 많이 걷고 싶은 하루인가요, 아니면 쉬고 싶은 하루인가요?",
    options: [
      { value: "MANY", label: "많이 걷기 (3~5km 이상)" },
      { value: "EASY", label: "적당히 걷기 (1~3km 정도)" },
      { value: "SIT", label: "앉아서 쉬기 (카페·전시 위주)" },
    ],
  },
  {
    key: "city",
    icon: "/assets/icons/map.svg",
    title: "원하는 지역을 선택하자",
    subtitle: "어느 지역으로 여행을 떠나고 싶으신가요?",
    options: [
      { value: "SEOUL", label: "서울" },
      { value: "BUSAN", label: "부산" },
      { value: "INCHEON", label: "인천" },
      { value: "DAEGU", label: "대구" },
      { value: "DAEJEON", label: "대전" },
      { value: "GWANGJU", label: "광주" },
      { value: "ULSAN", label: "울산" },
      { value: "SEJONG", label: "세종" },
      { value: "GYEONGGI", label: "경기도" },
      { value: "GANGWON", label: "강원도" },
      { value: "JEJU", label: "제주도" },
    ],
  },
];

export default function SurveyContainer() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const screen = SCREENS[step];

  const colsPerStep = [2, 3, 1, 1, 4];
  const columns = colsPerStep[step] || 1;

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [screen.key]: value }));
  };

  const handleNext = () => {
    if (!answers[screen.key]) return;
    if (step < SCREENS.length - 1) {
      setStep(step + 1);
    } else {
      console.log("submit", answers);
      router.push("/");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else router.back();
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack}><Image src="/assets/back-button.svg" alt="Back Button" width={20} height={20} /></S.BackButton>
        <S.Progress>
          {SCREENS.map((_, i) => (
            <S.Dot key={i} active={i <= step} />
          ))}
        </S.Progress>
      </S.Header>

      <S.Content>
        <S.Icon src={screen.icon} alt="" width={20} height={20} />
        <S.Title>{screen.title}</S.Title>
        <S.Subtitle>{screen.subtitle}</S.Subtitle>

        <S.Options columns={columns}>
          {screen.options.map(opt => (
            <S.Option
              key={opt.value}
              selected={answers[screen.key] === opt.value}
              onClick={() => handleSelect(opt.value)}
              step={step}
            >
              <S.OptionLabel>{opt.label}</S.OptionLabel>
              {opt.desc && <S.OptionDesc>{opt.desc}</S.OptionDesc>}
            </S.Option>
          ))}
        </S.Options>
      </S.Content>

      <S.Footer>
        <S.NextButton onClick={handleNext}>
          {step < SCREENS.length - 1 ? "다음" : "분석하기"}
        </S.NextButton>
      </S.Footer>
    </S.Container>
  );
}
