import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  background: url("/assets/loginBackground.jpg") no-repeat center center/cover;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
    z-index: 1;
  }
  overflow: hidden;
`;

export const SlideBox = styled.div<{ active: boolean }>`
  position: relative;
  z-index: 2;
  display: flex;
  width: 200%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: ${({ active }) =>
    active ? "translateX(-50%)" : "translateX(0)"};
`;

export const Screen = styled.div`
  width: 50%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  color: #fff;
  text-align: center;
`;

export const Title = styled.span`
  font-size: 1.5rem;
  line-height: 1.5;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: #B2B2B2;
`;

export const RegisterText = styled.span`
    cursor: pointer;
    color: #ffffff;
    transition: color 0.3s ease;

    &:hover {
        color: rgba(255, 255, 255, 0.8);
    }
`;

export const KakaoButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;