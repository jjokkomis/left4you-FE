export interface SurveyItem {
  id: number;
  user_id: number;
  type: 'THEME' | 'EMOTION' | 'TIME' | 'WALK_TYPE';
  value: string;
  created_at: string;
}

export interface Survey {
    data: SurveyItem[];
    count: number;
}

export interface SurveySubmission {
    city: string;
    emotion: string;
    theme: string;
    time: string;
    walk_type: string;
}

type SurveyKey = keyof SurveySubmission;

interface Option {
  value: SurveySubmission[SurveyKey];
  label: string;
  desc?: string;
}

export interface Screen {
  key: SurveyKey;
  icon: string;
  title: string;
  subtitle: string;
  options: Option[];
}

// 값 -> 표시 라벨 매핑 (SurveyContainer SCREENS 기반)
export const SURVEY_VALUE_LABEL: Record<SurveyItem['type'], Record<string, string>> = {
  THEME: {
    WALK: '골목 걷기',
    ART: '전시 & 예술',
    LIBRARY: '조용한 서점',
    ANIMAL: '반려동물과',
    NATURAL: '자연',
    MEDITATION: '명상',
    HISTORY: '역사 & 한옥',
    ACTIVITY: '활동적인',
  },
  EMOTION: {
    COMFORT: '위로',
    HAPPY: '기쁨',
    CALM: '차분함',
    MISS: '누군가를 떠올리며',
    COURAGE: '용기',
    WORRY: '생각 정리',
  },
  TIME: {
    HALF: '반나절',
    ALL: '하루 종일',
    NIGHT: '밤 산책',
  },
  WALK_TYPE: {
    MANY: '많이 걷기',
    EASY: '적당히 걷기',
    SIT: '앉아서 쉬기',
  }
};

export function mapSurveyThemeEmotion(survey?: Survey) {
  if (!survey) return { themes: [] as string[], emotions: [] as string[] };
  const themes = survey.data
    .filter(i => i.type === 'THEME')
    .map(i => SURVEY_VALUE_LABEL.THEME[i.value] || i.value);
  const emotions = survey.data
    .filter(i => i.type === 'EMOTION')
    .map(i => SURVEY_VALUE_LABEL.EMOTION[i.value] || i.value);
  return { themes, emotions };
}