import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    row-gap: 1rem;
`;

export const Wrapper = styled.div`
    display: flex;
    border: transparent;
    padding: 1.5rem 1rem;
    gap: 1rem;
    background-color: #F6F6F6;
    border-radius: 0.5rem;
    cursor: pointer;
`;

export const TextGroup = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: 0.5rem;
`;

export const Title = styled.div`
    display: flex;
    font-size: 1rem;
    font-family: "MiraeroNormal";
`;

export const SubTitle = styled.div`
    display: flex;
    padding: 0;
    font-size: 0.75rem;
    color: #B2B2B2;
    background-color: transparent;
    border: transparent;
    cursor: pointer;
    font-family: "MiraeroNormal";
`;

export const Btn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    border: transparent;
    background-color: transparent;
    font-size: 1.5rem;
    color: #B2B2B2;
    font-family: "MiraeroNormal";
    cursor: pointer;
`;