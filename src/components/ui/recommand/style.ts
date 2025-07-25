import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    row-gap: 1.5rem;
    padding: 2rem;
    background-color: #364155;
    border-radius: 0.5rem;
`;

export const Gift = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: auto;
`;

export const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const Title = styled.div`
    width: 75%;
    line-height: 1.3;
    font-size: 1rem;
    color: #fff;
`;

export const SubTitle = styled.button`
    display: flex;
    padding: 0;
    font-size: 0.75rem;
    color: #fff;
    background-color: transparent;
    border: transparent;
    cursor: pointer;
    font-family: "MiraeroNormal";
`;