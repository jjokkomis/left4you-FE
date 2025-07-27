import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

export default function Step() {
    const [number, setNumber] = useState(1);
    const router = useRouter();

    const handleBefore = () => {
        if (number > 1) {
            setNumber(prev => prev - 1);
        } else {
            router.push('/');
        }
    };

    const handleNext = () => {
        if (number < 3) {
            setNumber(prev => prev + 1);
        } else {
            router.push('/'); // 다음 페이지로 이동
        }
    };

    return (
        <Wrapper>
            <Btn onClick={handleBefore}>
                <Image src="/assets/Larrow.svg" alt="arrow" width={10} height={10} />
                이전
            </Btn>
            <h2>STEP {number}/3</h2>
            <Btn onClick={handleNext}>
                다음
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