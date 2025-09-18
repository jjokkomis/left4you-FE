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

  const { courseDetail, isDetailLoading: isLoading } = useCourse(courseId);

  const handleShare = async () => {
    const shareData = {
      title: `${courseDetail?.course?.name || "특별한 코스"} - 너에게 남긴 하루`,
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

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingView>
          <Image src="/assets/icons/presentHand.svg" alt="Loading" width={54} height={54} />
          <S.LoadingText>코스 불러오는 중</S.LoadingText>
        </S.LoadingView>
      </S.Container>
    );
  }

  if (!courseDetail?.course) {
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

  const course = courseDetail.course;
  const places = course.places || [];

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
          <S.CourseTitle>{course.name}</S.CourseTitle>
          <S.CourseMeta>
            <S.Rating>⭐ {course.score ? course.score.toFixed(1) : "미평가"}</S.Rating>
            <S.Location>📍 {course.place_name || "위치 정보 없음"}</S.Location>
          </S.CourseMeta>
        </S.CourseHeader>

        {course.content && (
          <S.Description>
            <S.DescriptionTitle>코스 소개</S.DescriptionTitle>
            <S.DescriptionContent>{course.content}</S.DescriptionContent>
          </S.Description>
        )}

        {places.length > 0 && (
          <S.PlacesList>
            <S.PlacesTitle>코스 장소들</S.PlacesTitle>
            {places.map((place: any, index: number) => (
              <S.PlaceItem key={index}>
                <S.PlaceNumber>{String.fromCharCode(65 + index)}</S.PlaceNumber>
                <S.PlaceInfo>
                  <S.PlaceName>{place.place_name || `장소 ${index + 1}`}</S.PlaceName>
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