import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

interface StepProps {
    currentStep: number;
    onNext: () => void;
    onPrev: () => void;
}

export default function Step({ currentStep, onNext, onPrev }: StepProps) {
    return (
        <Wrapper>
            <Btn onClick={onPrev}>
                <Image src="/assets/Larrow.svg" alt="arrow" width={10} height={10} /> 이전 
            </Btn>
            <h2>STEP {currentStep}/3</h2>
            <Btn onClick={onNext}> 다음
                <Image src="/assets/Barrow.svg" alt="arrow" width={10} height={10} />
            </Btn>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Btn = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.2rem;
    color: #000;
    border: transparent;
    background-color: #E9E9E9;
    font-size: 1rem;
    border-radius: 0.25rem;
    font-family: 'MiraeroNormal';
    cursor: pointer;

    &:hover {
        background-color: #D9D9D9;
    }
`;