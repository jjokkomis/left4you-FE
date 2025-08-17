import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
    width: 100%;
    margin-top: 10%;
    max-width: 400px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.3rem;
`;

export const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`;

export const SubTitle = styled.div`
    font-size: 1.25rem;
`;

export const Box = styled.button`
    display: flex;
    align-items: center;
    height: 10vh;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
`;

export const CourseName = styled.div`
    display: flex;
    font-size: 1.25rem;
    color: #fff;
`;