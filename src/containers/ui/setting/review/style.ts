import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2.4rem;
    width: 100%;
    height: 100vh;
    margin-top: 2%;
    padding: 0rem 1rem 0rem 1rem ;
    max-width: 400px;
    overflow: hidden;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const Img = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
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

export const StarWrapper = styled.div`
    display: flex;
    font-size: 2.25rem;
    color: #364155;
    letter-spacing: 0.4rem;
`;

export const Star = styled.span`
    cursor: pointer;
`;

export const ReviewTitle = styled.textarea`
    display: flex;
    font-size: 1rem;
    padding: 1rem 1rem 0rem 1rem;
    background-color: #FAFAFA;
    border-radius: 0.25rem;
    border: 0.1rem solid #D5D5D5;
    resize: none;
    outline: none;
    overflow: hidden;

    &::placeholder {
        display: flex;
        justify-content: center;
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
    border: 0.1rem solid #D5D5D5;
    resize: none;
    outline: none;
    overflow: hidden;

    &::placeholder {
        color: #B2B2B2;
    }
`;
