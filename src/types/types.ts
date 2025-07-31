export interface StepProps {
    currentStep: number;
    onNext: () => void;
    onPrev: () => void;
}