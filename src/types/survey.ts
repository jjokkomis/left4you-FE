export interface Survey {
    data: [];
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