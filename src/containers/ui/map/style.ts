import styled from "@emotion/styled";

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    max-width: 25rem;
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.8rem;
    background: none;
    z-index: 2;
    width: 100%;
`;

export const Input = styled.input`
    flex: 1;
    padding: 0.5rem;
    border: none;
    color: #364155;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 1rem;
    border: 1px solid #364155;
    background: white;
    border-radius: 44rem;
    gap: 0.4rem;
    cursor: pointer;
`;

export const Text = styled.div`
    display: flex;
    justify-content: center;
    color: #364155;
`;

export const MapWrapper = styled.div`
    width: 100%;
    height: 80%;
`;