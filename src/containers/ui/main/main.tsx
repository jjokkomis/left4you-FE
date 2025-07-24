"use client";
import styled from "@emotion/styled";

export default function Main() {
    return (
        <Container>
            <Title>추천기능</Title>
            <Box />
            <Title>이런 기능도 있어요</Title>
            <Box />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 400px;
    font-family: "MiraeroNormal";
`;

const Title = styled.h2`
    color: #1d1d1d;
`;

const Box = styled.div`
    height: 20vh;
    width: 100%;
    padding: 2rem 3rem;
    border-radius: 0.25rem;
    background-color: #464646;
    box-sizing: border-box;
`;