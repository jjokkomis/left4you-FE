import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    row-gap: 2rem;
    width: 100%;
    max-width: 400px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const Title = styled.div`
    font-size: 1.25rem;
`;

export const CourseName = styled.textarea`
    width: 100%;
    border: 0.1rem solid #EDEDED;
    border-radius: 0.25rem;
    padding: 1rem 1rem 0 1rem;
    font-size: 1rem;
    resize: none;
    font-family: 'MiraeroNormal';

    ::placeholder {
        color: #B2B2B2;
    }

    &:focus {
        outline: none;
    }
`;

export const Map = styled.div`
    width: 100%;
    height: 30vh;
    background-color: #ddd;
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const Course = styled.div`
    display: flex;
    align-items: center;
    border: 0.1rem solid #EDEDED;
    border-radius: 0.25rem;
    padding: 0.8rem;
    font-size: 1rem;
    resize: none;
`;