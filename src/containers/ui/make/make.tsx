"use client";
import styled from "@emotion/styled";
import Step from "@/components/ui/make/step";

export default function Makepage() {
    return (
        <Container>
            <Step />
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
