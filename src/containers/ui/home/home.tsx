"use client";
import styled from "@emotion/styled";
import Recommand from "@/components/ui/home/recommand/recommand";
import Various from "@/components/ui/home/various/various";

export default function Main() {
    return (
        <Container>
            <Title>추천기능</Title>
            <Recommand />
            <Title>이런 기능도 있어요</Title>
            <Various />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    font-family: "MiraeroNormal";
`;

const Title = styled.h2`
    color: #1d1d1d;
`;