import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  z-index: 10;
  flex-shrink: 0;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e9ecef;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  
  span {
    font-size: 18px;
  }
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 0 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const CourseHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
`;

export const CourseTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
  line-height: 1.3;
`;

export const CourseMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #666;
`;

export const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Location = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const MapContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DescriptionTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

export const DescriptionContent = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  white-space: pre-line;
`;

export const PlacesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PlacesTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

export const PlaceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

export const PlaceNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #364155;
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

export const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PlaceName = styled.div`
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
`;

export const PlaceCoords = styled.div`
  font-size: 0.8rem;
  color: #666;
  font-family: monospace;
`;

export const PlaceDescription = styled.p`
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #555;
  margin-top: 0.25rem;
`;

export const PlaceDuration = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const PlaceCategory = styled.span`
  font-size: 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.15rem 0.4rem;
  border-radius: 12px;
  margin-top: 0.25rem;
  display: inline-block;
`;

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-top: 1rem;
`;

export const CourseInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InfoIcon = styled.span`
  font-size: 1.1rem;
  width: 24px;
  display: flex;
  justify-content: center;
`;

export const InfoText = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: center;
`;

export const ActionText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #666;
`;

export const LoadingView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  padding: 2rem;
  overflow: hidden;
`;

export const LoadingText = styled.p`
  font-size: 1.1rem;
  color: #364155;
  margin: 0;
  
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

export const ErrorView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
  overflow: hidden;
`;

export const ErrorText = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
`;

export const ErrorDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #666;
`;

export const DayFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const PeriodBlock = styled.div`
  margin-bottom: 16px;
`;

export const PeriodHeading = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0dd4aa;
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid #0dd4aa;
`;

export const PlaceWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

export const PlaceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  span {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
`;

export const PlaceHeaderBottom = styled.div`
  margin-bottom: 12px;
  
  span {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;

export const SectionDivider = styled.div`
  height: 1px;
  background: #e0e0e0;
  margin: 16px 0;
`;