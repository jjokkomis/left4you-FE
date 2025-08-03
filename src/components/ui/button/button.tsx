import styled from "@emotion/styled";
import type { BtnProps } from "@/types/types";

export default function Btn({ children, onClick }: BtnProps) {
    return (
        <Container>
            <Button onClick={onClick}>{children}</Button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    width: 50%;
    padding: 1rem;
    border: none;
    background-color: #364155;
    color: #fff;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
`;