export const REGIONS = ['서울','부산','대구','인천','광주','제주','대전','경기','울산','세종'] as const;
export const REGIONSENG = ['SEOUL','BUSAN','DAEGU','INCHEON','GWANGJU','JEJU','DAEJEON','GYEONGGI','ULSAN','SEJONG'] as const;
export type Region = typeof REGIONS[number];
export type RegionEng = typeof REGIONSENG[number];

export interface Course {
  location: string;    // ex) '뚝섬 -> 반포'
  place: string;       // 장소명
  description: string; // HTML (\n 또는 <br />) 포함 가능
  latitude?: number;   // 위도 (optional)
  longitude?: number;  // 경도 (optional)
}

export interface GiftData {
  name: string;        // 코스 이름 / 타이틀
  courses: Course[];   // 시간대 순 (오전, 오후, 저녁)
}

export const fakeGiftData: GiftData = {
  name: '한강 공원 힐링 & 야경 명소 투어',
  courses: [
    {
      location: '뚝섬 -> 반포',
      place: '뚝섬한강공원',
      description: '윈도서핑, 수상싀 등으로 수정레저 체험<br />공원산책로, 장미정원, 음악분수도 전망 포인트로 참고<br />점심으로 공원 주변 포장마차에서 식사',
      latitude: 37.537,
      longitude: 127.009
    },
    {
      location: '공원',
      place: '선유도',
      description: '옛 정수장 재생, 생태 산책로 산책',
      latitude: 37.528,
      longitude: 126.901
    },
    {
      location: '반포공원 & 달빛무지개분수',
      place: '반포한강공원',
      description: '세게에서 가장 긴 교량 분수로 기네스에 등재<br />여름 21:30분까지 분수쇼 진행<br />푸드트럭과 카페도 있어 분위기 있는 야경데이트 가능',
      latitude: 37.505,
      longitude: 127.007
    }
  ]
};

export const REGION_CODE: Record<Region, typeof REGIONSENG[number]> = {
  '서울': 'SEOUL',
  '부산': 'BUSAN',
  '대구': 'DAEGU',
  '인천': 'INCHEON',
  '광주': 'GWANGJU',
  '제주': 'JEJU',
  '대전': 'DAEJEON',
  '경기': 'GYEONGGI',
  '울산': 'ULSAN',
  '세종': 'SEJONG',
};
