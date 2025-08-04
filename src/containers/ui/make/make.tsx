"use client";

import { useState } from 'react';
import * as S from './style';
import Step from "@/components/ui/make/step";
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';

export default function Make() {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const beforeStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <S.Container>
            <Step currentStep={step} onNext={nextStep} onPrev={beforeStep} />

            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}

        </S.Container>
    );
}