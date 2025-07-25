import styled from "@emotion/styled";

export const Wrapper = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    margin-bottom: 4rem;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    &::-webkit-scrollbar {
        height: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 0.25rem;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    row-gap: 1.5rem;
    padding: 2rem;
    border-radius: 0.5rem;
`;

export const First = styled(Container)`
    background-color: #364155;
    color: #fff;
`;

export const Second = styled(Container)`
    background-color: #F5E7CC;
    color: #1D1D1D;
`;

export const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const Title = styled.div<{ variant: "first" | "second" }>`
    line-height: 1.3;
    font-size: 1rem;
    color: ${({ variant }) => (variant === "first" ? "#fff" : "#1D1D1D")};
`;

export const SubTitle = styled.button<{ variant: "first" | "second" }>`
    display: flex;
    padding: 0;
    font-size: 0.75rem;
    color: ${({ variant }) => (variant === "first" ? "#fff" : "#1D1D1D")};
    background-color: transparent;
    border: transparent;
    cursor: pointer;
    font-family: "MiraeroNormal";
`;