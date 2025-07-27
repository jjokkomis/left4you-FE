import styled from "@emotion/styled";
import Image from "next/image";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

export const Progress = styled.div`
  flex: 1;
  display: flex;
  gap: 0.25rem;
`;

export const Dot = styled.span<{ active: boolean }>`
  flex: 1;
  height: 0.25rem;
  background: ${p => (p.active ? "#364155" : "#e0e0e0")};
  border-radius: 2px;
`;

export const Content = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

export const Icon = styled(Image)`
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  margin: 0.5rem 0;
`;

export const Subtitle = styled.p`
  color: #888;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

export const Options = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.columns}, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const Option = styled.button<{ selected: boolean, step: number }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${p => (p.selected ? "#364155" : "#D5D5D5")};
  background: ${p => (p.selected ? "rgba(54, 65, 85, 0.03)" : "white")};
  border-radius: 0.375rem;
  text-align: ${p => (p.step === 0 || p.step === 3 ? "left" : "center")};
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
`;

export const OptionLabel = styled.div`
  font-weight: 500;
`;

export const OptionDesc = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
`;

export const Footer = styled.div`
  position: sticky;
  bottom: 0;
  background: #fff;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NextButton = styled.button`
  width: 70%;
  padding: 0.75rem;
  background: #364155;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
`;
