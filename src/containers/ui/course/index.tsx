"use client";

import { useParams, useRouter } from "next/navigation";
import useCourse from "@/hooks/useCourse";
import * as S from "./style";
import Btn from "@/components/ui/button/button";
import Image from "next/image";

export default function CourseDetailContainer() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  const { courseData, loading } = useCourse(courseId);

  console.log("CourseDetailContainer - courseData:", courseData);

  const handleShare = async () => {
    const shareData = {
      title: `${courseData?.name || "특별한 코스"} - 너에게 남긴 하루`,
      text: `특별한 코스를 발견했어요! 함께 둘러보시겠어요?`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('코스 링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('공유 실패:', error);
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('코스 링크가 클립보드에 복사되었습니다!');
      } catch (clipboardError) {
        console.error('클립보드 복사 실패:', clipboardError);
        alert('공유에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.LoadingView>
          <Image src="/assets/icons/presentHand.svg" alt="Loading" width={54} height={54} />
          <S.LoadingText>코스 불러오는 중</S.LoadingText>
        </S.LoadingView>
      </S.Container>
    );
  }

  if (!courseData || !courseData.courses || courseData.courses.length === 0) {
    return (
      <S.Container>
        <S.ErrorView>
          <Image src="/assets/404.svg" alt="Not Found" width={120} height={120} />
          <S.ErrorText>코스를 찾을 수 없습니다</S.ErrorText>
          <S.ErrorDescription>
            링크가 올바르지 않거나 삭제된 코스일 수 있습니다.
          </S.ErrorDescription>
          <Btn onClick={() => router.push("/")}>홈으로 가기</Btn>
        </S.ErrorView>
      </S.Container>
    );
  }

  type CoursePlace = {
    id?: number;
    place?: string;
    location?: string;
    description?: string;
  };
  const courses: CoursePlace[] = courseData.courses || [];
  const periods = ["오전", "오후", "저녁"] as const;

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => router.back()}>
          <Image
            src="/assets/back-button.svg"
            alt="back"
            width={20}
            height={20}
            style={{ pointerEvents: "none" }}
          />
        </S.BackButton>
        <S.ShareButton onClick={handleShare}>
          <span>📤</span>
        </S.ShareButton>
      </S.Header>

      <S.Content>
        <S.CourseHeader>
          <S.CourseTitle>{courseData.name}</S.CourseTitle>
          <S.CourseMeta>
            <S.Rating>⭐ 추천 코스</S.Rating>
            <S.Location>📍 {courses.length}개의 장소</S.Location>
          </S.CourseMeta>
        </S.CourseHeader>

        {courses.length > 0 && (
          <S.PlacesList>
            <S.PlacesTitle>코스 장소들</S.PlacesTitle>
            {courses.map((courseItem: CoursePlace, index: number) => (
              <S.PlaceItem key={courseItem.id || index}>
                <S.PlaceNumber>{periods[index] || String.fromCharCode(65 + index)}</S.PlaceNumber>
                <S.PlaceInfo>
                  <S.PlaceName>{courseItem.place || `장소 ${index + 1}`}</S.PlaceName>
                  <S.PlaceCoords>{courseItem.location || "위치 정보 없음"}</S.PlaceCoords>
                </S.PlaceInfo>
              </S.PlaceItem>
            ))}
          </S.PlacesList>
        )}

        <S.ActionSection>
          <S.ActionText>
            이 코스가 마음에 드셨나요?<br />
            나만의 코스도 만들어보세요!
          </S.ActionText>
          <Btn onClick={() => router.push("/make")}>코스 만들기</Btn>
        </S.ActionSection>
      </S.Content>
    </S.Container>
  );
}