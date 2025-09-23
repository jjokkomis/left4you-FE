import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 100%;
    max-width: 400px;
    overflow-x: hidden;
    height: auto;
`;

export const MapWrapper = styled.div`
    width: 100%;
 
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

    &::placeholder {
        color: #B2B2B2;
    }

    &:focus {
        outline: none;
    }
`;

export const Box = styled.div`
    width: 100%;
    border: 0.1rem solid #EDEDED;
    border-radius: 0.25rem;
    padding: 1rem;
    font-size: 1rem;
    resize: none;
    font-family: 'MiraeroNormal';
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const CourseInput = styled.input`
    display: flex;
    align-items: center;
    border: 0.1rem solid #EDEDED;
    border-radius: 0.25rem;
    padding: 0.8rem;
    font-size: 1rem;
    resize: none;
    font-family: 'MiraeroNormal';

    &:focus {
        outline: none;
    }
`;

export const Sub = styled.div`
    font-size: 1rem;
    margin-top: 1rem;
`;

export const Course = styled.div`
    display: flex;
    align-items: center;
    border: 0.1rem solid #EDEDED;
    border-radius: 0.25rem;
    padding: 0.8rem;
    font-size: 1rem;
    resize: none;
    font-family: 'MiraeroNormal';

    &:focus {
        outline: none;
    }
`;

export const Pack = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Name = styled.div`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    color: #B2B2B2;
`;

export const PreviewTitle = styled.div`
    display: flex;
    margin-top: 1rem;
    font-size: 1.2rem;
    display: flex;
`;

export const BtnGap = styled.div`
    margin-top: 3rem;
`;

export const Map = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; 
    padding-left: 10%;
    height: 20vh;
    margin: 1rem 0;
    border-radius: 0.25rem;
    background: rgba(0, 0, 0, 0.5);
    background-size: cover;
`;

export const Overlay = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    color: #fff;
    row-gap: 0.2rem;
`;

export const CourseTitle = styled.div`
    font-size: 1.8rem;
`;

export const Location = styled.div`
    font-size: 1.2rem;
    margin: 0.5rem 0;
`;

export const MyLocationGroup = styled.h4`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Message = styled.div`
    font-size: 1rem;
    color: #D5D5D5;
`;

export const MessageInput = styled.textarea`
    display: flex;
    align-items: center;
    border: 0.1rem solid #EDEDED;
    border-radius: 0.25rem;
    padding: 0.8rem;
    font-size: 1rem;
    resize: none;
    font-family: 'MiraeroNormal';

    &:focus {
        outline: none;
    }
`;

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TourListWrapper = styled.div`
    margin-top: 2rem;
    row-gap: 1rem;
    

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 0.5rem;
        margin-top: 1rem;
        padding: 0.8rem;
        background-color: #f9f9f9;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    li:hover {
        background-color: #e0e0e0;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`;

export const ToggleBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 1rem;
    border: none;
    background-color: transparent;
    color: #364155;
    border: 1px solid #364155;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
`;