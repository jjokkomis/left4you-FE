import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 3.2rem;
    width: 100%;
    margin-top: 10%;
    max-width: 400px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.4rem;
`;

export const Title = styled.div`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
`;

export const SubTitle = styled.div`
    font-size: 0.875rem;
    color: #B2B2B2;
`;

export const Star = styled.div`
    display: flex;
    font-size: 2.25rem;
    color: #364155;
    letter-spacing: 0.4rem;
`;

export const ReviewTitle = styled.textarea`
    display: flex;
    height: 5vh;
    font-size: 1rem;
    padding: 1rem;
    background-color: #FAFAFA;
    border-radius: 0.25rem;
    border: none;
    resize: none;
    outline: none;

    &::placeholder {
        color: #B2B2B2;
    }
`;

export const Review = styled.textarea`
    display: flex;
    height: 20vh;
    font-size: 1rem;
    padding: 1rem;
    background-color: #FAFAFA;
    border-radius: 0.25rem;
    border: none;
    resize: none;
    outline: none;

    &::placeholder {
        color: #B2B2B2;
    }
`;