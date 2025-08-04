export interface StepProps {
    currentStep: number;
    onNext: () => void;
    onPrev: () => void;
}
export interface KakaoMapHandle {
    moveToAddress: (address: string) => void;
}

export interface Location {
    address: string;
    coord: { lat: number; lng: number } | null;
}

export interface CourseData {
    name: string;
    content: string;
    message?: string;
    id: string;
}

export interface BtnProps {
    children: React.ReactNode;
    onClick?: () => void;
}