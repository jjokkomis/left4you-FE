import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 2rem 1rem 0 1rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SelectedRegionBar = styled.div`
  padding: 1rem;
  border: 1px solid #ededed;
  border-radius: 4px;
`;

export const RegionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RegionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const RegionButton = styled.button<{ selected?: boolean }>`
  border: 1px solid ${({ selected }) => (selected ? '#364155' : '#aaaaaa')};
  background: ${({ selected }) => (selected ? 'rgba(54,65,85,0.10)' : 'transparent')};
  color: ${({ selected }) => (selected ? '#364155' : '#b2b2b2')};
  border-radius: 24px;
  padding: 7px 15px;
  font-size: 16px;
  line-height: 1.2;
  cursor: pointer;
  transition: background .18s ease, color .18s ease, border-color .18s ease;
  &:hover { background: ${({ selected }) => (selected ? 'rgba(54,65,85,0.15)' : 'rgba(54,65,85,0.06)')}; }
  &:active { transform: translateY(1px); }
`;

export const Hero = styled.div<{ bgSrc?: string }>`
  position: relative;
  padding: 3rem 2rem;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url(${({ bgSrc }) => bgSrc}) center/cover no-repeat;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%),
      radial-gradient(circle at 50% 95%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%);
    pointer-events: none;
  }
`;

export const HeroContent = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 20px;
  line-height: 1.2;
`;

export const HeroLine = styled.p<{ dimmed?: boolean }>`
  margin: 0;
  color: ${({ dimmed }) => (dimmed ? '#b2b2b2' : '#fdfdfe')};
  white-space: nowrap;
`;

export const LoadingView = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  font-family: 'MiraeroNormal', sans-serif;
`;

export const LoadingText = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: #364155;
  position: relative;
  &:after {
    content: '...';
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    width: 0ch;
    animation: loading-dots 1.2s steps(4, end) infinite;
  }
  @keyframes loading-dots {
    0% { width: 0ch; }
    100% { width: 4ch; }
  }
`;

export const ResultSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 390px;
  max-width: 100%;
`;

export const ResultCard = styled.div`
  background: #fff;
  border: 1px solid #e5e8eb;
  border-radius: 12px;
  padding: 1rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: .75rem;
`;

export const ResultTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
`;

export const ResultDesc = styled.p`
  margin: 0;
  font-size: .85rem;
  line-height: 1.5;
  color: #4a5565;
  white-space: pre-line;
`;

export const ResultMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: .7rem;
  color: #94a1b2;
  text-transform: uppercase;
  letter-spacing: .5px;
`;

export const DayFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  max-height: 50vh;
`;

export const FlowTitle = styled.h3`
  margin: 0 0 1.25rem;
`;

export const PeriodBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: .9rem;
`;

export const PeriodHeading = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

export const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: .4rem;
`;

export const PlaceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: .4rem;

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const PlaceHeaderBottom = styled.div`
  font-size: .9rem;
`;

export const PlaceDescription = styled.p`
  margin: 0;
  font-size: .85rem;
  line-height: 1.4;
  color: #333;
  white-space: pre-line;
`;

export const SectionDivider = styled.hr`
  all: unset;
  display: block;
  width: 100%;
  height: 1px;
  background: #e9ecef;
  margin: 1rem 0 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1rem;
`;

export const ShareButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border: 1px solid #364155;
  background-color: transparent;
  color: #364155;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export const RetryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
  color: #6c757d;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;