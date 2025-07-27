"use client";
import styled from "@emotion/styled";
import Recommand from "@/components/ui/home/recommand/recommand";
import Various from "@/components/ui/home/various/various";

export default function Main() {
    return (
        <Container>
            <h2>추천기능</h2>
            <Recommand />
            <h2>이런 기능도 있어요</h2>
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
`;