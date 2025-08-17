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
  courseId: number;
}

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
