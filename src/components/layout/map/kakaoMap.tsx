'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import type { KakaoMapHandle, MapProps } from "@/types/types";
import useTourItems from "@/hooks/useTourItems";

declare global {
  interface Window { 
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        CustomOverlay: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        event: {
          addListener: (target: any, type: string, handler: (event: any) => void) => void;
        };
        services: {
          Status: { OK: string };
          Geocoder: new () => any;
        };
      };
    }
  }
}

const KakaoMap = forwardRef<KakaoMapHandle, MapProps & { height?: string }>(
  function KakaoMapComponent({ onSelectLocation, center, height = "400px" }, ref) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const marker = useRef<any>(null);
    const geocoder = useRef<any>(null);
    const tourMarkers = useRef<any[]>([]);

    const [initialCenter, setInitialCenter] = useState<{ lat: number; lng: number } | null>(null);
    const [currentMapCenter, setCurrentMapCenter] = useState<{ lat: number; lng: number } | null>(null);

    // center prop이 제공되면 우선 사용, 아니면 현재 위치 기반 초기 중심
    useEffect(() => {
      if (center) {
        setInitialCenter(center);
        return;
      }
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setInitialCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => setInitialCenter({ lat: 33.450701, lng: 126.570667 })
        );
      } else {
        setInitialCenter({ lat: 33.450701, lng: 126.570667 });
      }
    }, [center]);

    // API로 관광지 가져오기 (현재 지도 중심 기준)
    const { items: tourItems, refetch: refetchTourItems } = useTourItems(
      currentMapCenter?.lat ?? null, 
      currentMapCenter?.lng ?? null
    );

    // 지도 로드
    useEffect(() => {
      if (!mapRef.current || !initialCenter) return;

      const loadMap = () => {
        const { kakao } = window;
        geocoder.current = new kakao.maps.services.Geocoder();

        const options = {
          center: new kakao.maps.LatLng(initialCenter.lat, initialCenter.lng),
          level: 3,
        } as const;

        mapInstance.current = new kakao.maps.Map(mapRef.current!, options);
        marker.current = new kakao.maps.Marker({ position: options.center });
        marker.current.setMap(mapInstance.current);

        // 초기 지도 중심 설정
        setCurrentMapCenter(initialCenter);

        // 지도 클릭 시 위치 선택
        kakao.maps.event.addListener(mapInstance.current, "click", (mouseEvent: { latLng: any }) => {
          const latlng = mouseEvent.latLng;
          const lat = latlng.getLat();
          const lng = latlng.getLng();

          geocoder.current?.coord2Address(lng, lat, (result: any[], status: string) => {
            if (status === kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              marker.current?.setPosition(latlng);
              onSelectLocation(lat, lng, address);
            }
          });
        });

        // 초기 위치 주소 가져오기
        geocoder.current?.coord2Address(initialCenter.lng, initialCenter.lat, (result: any[], status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            onSelectLocation(initialCenter.lat, initialCenter.lng, address);
          }
        });
      };

      if (!window.kakao) {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => window.kakao.maps.load(loadMap);
        document.head.appendChild(script);
      } else {
        window.kakao.maps.load(loadMap);
      }
    }, [initialCenter, onSelectLocation]);

    // 중심 이동
    useEffect(() => {
      if (center && mapInstance.current && marker.current) {
        const moveLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);
        mapInstance.current.setCenter(moveLatLng);
        marker.current.setPosition(moveLatLng);
      }
    }, [center]);

    // 관광지 마커 표시
    useEffect(() => {
      if (!mapInstance.current || !tourItems || !window.kakao) return;

      // 기존 오버레이 제거 - 가장 안전한 방법
      if (tourMarkers.current.length > 0) {
        tourMarkers.current.forEach((overlay) => {
          if (overlay) {
            try {
              // 정보창 정리
              if (overlay.infoWindow) {
                overlay.infoWindow.close();
                delete overlay.infoWindow;
              }
              // 지도에서 제거
              overlay.setMap(null);
            } catch {
              // 에러 무시하고 계속 진행
            }
          }
        });
        // 배열 완전히 초기화
        tourMarkers.current.length = 0;
      }

      tourItems.forEach((item: {
        mapy?: string;
        mapx?: string;
        cat1?: string;
        title: string;
        addr1?: string;
        tel?: string;
        dist?: string;
        firstimage?: string;
      }) => {
        if (item.mapy && item.mapx) {
          const position = new window.kakao.maps.LatLng(parseFloat(item.mapy), parseFloat(item.mapx));
          
          // 카테고리별 마커 이미지 설정
          let markerImageSrc = '';
          const cat1 = item.cat1;
          if (cat1 === 'A05') markerImageSrc = '🍽️'; // 음식점
          else if (cat1 === 'A02') markerImageSrc = '🛍️'; // 쇼핑
          else if (cat1 === 'A01') markerImageSrc = '🏛️'; // 관광지
          else if (cat1 === 'A03') markerImageSrc = '🎯'; // 레포츠
          else if (cat1 === 'B02') markerImageSrc = '🏨'; // 숙박
          else markerImageSrc = '📍'; // 기본

          // 커스텀 마커 HTML
          const markerElement = document.createElement('div');
          markerElement.innerHTML = `
            <div style="
              background: white;
              border: 2px solid #364155;
              border-radius: 20px;
              padding: 8px 12px;
              font-size: 16px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              cursor: pointer;
              text-align: center;
              min-width: 60px;
              pointer-events: auto;
            ">
              <div style="font-size: 18px; margin-bottom: 2px;">${markerImageSrc}</div>
              <div style="font-size: 11px; font-weight: bold; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80px;">
                ${item.title.length > 8 ? item.title.substring(0, 8) + '...' : item.title}
              </div>
            </div>
          `;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: markerElement,
            yAnchor: 1,
            clickable: true
          });

          // 지도에 오버레이 추가 - 단순하게
          customOverlay.setMap(mapInstance.current);
          tourMarkers.current.push(customOverlay);

          // 상세 정보 창
          const infoContent = `
            <div style="
              padding: 12px; 
              max-width: 250px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.2);
              position: relative;
            ">
              <div style="font-weight: bold; font-size: 14px; color: #333; margin-bottom: 6px; line-height: 1.2;">
                ${item.title}
              </div>
              ${item.addr1 ? `<div style="font-size: 12px; color: #666; margin-bottom: 6px; line-height: 1.3;">
                📍 ${item.addr1.length > 40 ? item.addr1.substring(0, 40) + '...' : item.addr1}
              </div>` : ''}
              ${item.tel ? `<div style="font-size: 12px; color: #666; margin-bottom: 6px;">
                📞 ${item.tel}
              </div>` : ''}
              <div style="font-size: 11px; color: #999; margin-bottom: 8px;">
                거리: ${Math.round(parseFloat(item.dist || '0') || 0)}m
              </div>
              ${item.firstimage ? `<div style="text-align: center; margin-bottom: 8px;">
                <img src="${item.firstimage}" alt="${item.title}" 
                     style="width: 100%; max-width: 200px; height: 80px; object-fit: cover; border-radius: 6px;" />
              </div>` : ''}
              <div style="text-align: center;">
                <button onclick="window.open('https://map.kakao.com/link/to/${item.title},${item.mapy},${item.mapx}', '_blank')" 
                        style="background: #364155; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                  길찾기
                </button>
              </div>
            </div>
          `;

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: infoContent,
            removable: true, // X 버튼으로 닫을 수 있게
            position: position // 마커와 같은 위치로 설정
          });

          // DOM 요소에 직접 클릭 이벤트 추가
          const markerDiv = markerElement.querySelector('div');
          if (markerDiv) {
            markerDiv.addEventListener('click', () => {
              
              // 다른 정보창 닫기 - 단순하게
              tourMarkers.current.forEach((overlay) => {
                if (overlay && overlay.infoWindow && overlay !== customOverlay) {
                  overlay.infoWindow.close();
                }
              });
              
              // 현재 정보창 열기 - 위치 지정해서 열기
              infoWindow.open(mapInstance.current);
              customOverlay.infoWindow = infoWindow;
            });
          }
        }
      });
    }, [tourItems]);

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
      return () => {
        // 모든 오버레이 정리 - 단순하게
        const markersToClean = tourMarkers.current;
        markersToClean.forEach((overlay) => {
          if (overlay) {
            if (overlay.infoWindow) {
              overlay.infoWindow.close();
            }
            overlay.setMap(null);
          }
        });
        tourMarkers.current = [];
      };
    }, []);

    // 외부 제어 메서드
    useImperativeHandle(ref, () => ({
      moveToAddress: (address: string) => {
        if (!geocoder.current || !mapInstance.current || !marker.current) return;

        geocoder.current.addressSearch(address, (result: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);
            const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
            mapInstance.current.setCenter(moveLatLng);
            marker.current.setPosition(moveLatLng);
            onSelectLocation(lat, lng, address);
          }
        });
      },
      moveToLatLng: (lat: number, lng: number) => {
        if (!mapInstance.current || !marker.current) return;

        const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
        mapInstance.current.setCenter(moveLatLng);
        marker.current.setPosition(moveLatLng);

        if (geocoder.current) {
          geocoder.current.coord2Address(lng, lat, (result: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              onSelectLocation(lat, lng, address);
            }
          });
        }
      }
    }));

    return (
      <div style={{ position: 'relative' }}>
        <div ref={mapRef} style={{ width: "100%", height, borderRadius: "0.2rem" }} />
        {currentMapCenter && mapInstance.current && (
          <button
            onClick={() => {
              // 현재 지도 중심으로 업데이트 후 검색 - 단순하게
              if (mapInstance.current) {
                const center = mapInstance.current.getCenter();
                const newCenter = { lat: center.getLat(), lng: center.getLng() };
                setCurrentMapCenter(newCenter);
                // 약간의 지연 후 검색
                setTimeout(() => refetchTourItems(), 100);
              }
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#364155',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 1000
            }}
          >
            🔄 주변 검색
          </button>
        )}
      </div>
    );
  }
);

export default KakaoMap;
