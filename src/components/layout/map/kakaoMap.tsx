'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import type { KakaoMapHandle, MapProps } from "@/types/types";

const KakaoMap = forwardRef<KakaoMapHandle, MapProps & { height?: string; tourItems?: any[] }>(
  ({ onSelectLocation, center, height = "400px", tourItems = [] }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<kakao.maps.Map | null>(null);
    const marker = useRef<kakao.maps.Marker | null>(null);
    const geocoder = useRef<kakao.maps.services.Geocoder | null>(null);
    const tourMarkers = useRef<kakao.maps.Marker[]>([]);
// 전역 kakao 선언 (타입 안전성보다 빌드 통과 우선)
declare global {
  interface Window { kakao: any }
}

const KakaoMap = forwardRef<KakaoMapHandle, MapProps & { height?: string }>(
  ({ onSelectLocation, center, height = "400px" }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any | null>(null);
    const marker = useRef<any | null>(null);
    const geocoder = useRef<any | null>(null);

    const [initialCenter, setInitialCenter] = useState<{ lat: number; lng: number } | null>(null);

    // 초기 위치 설정
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setInitialCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => setInitialCenter({ lat: 33.450701, lng: 126.570667 })
        );
      } else {
        setInitialCenter({ lat: 33.450701, lng: 126.570667 });
      }
    }, []);

    // 지도 로드
    useEffect(() => {
      if (!mapRef.current || !initialCenter) return;

      const loadMap = () => {
        const { kakao } = window as any;
        geocoder.current = new kakao.maps.services.Geocoder();

        const options = {
          center: new kakao.maps.LatLng(initialCenter.lat, initialCenter.lng),
          level: 3,
        } as const;

        mapInstance.current = new kakao.maps.Map(mapRef.current, options);
        marker.current = new kakao.maps.Marker({ position: options.center });
        marker.current.setMap(mapInstance.current);

        // 지도 클릭 시 위치 선택
        kakao.maps.event.addListener(mapInstance.current, "click", (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          const lat = latlng.getLat();
          const lng = latlng.getLng();

          geocoder.current?.coord2Address(lng, lat, (result: any, status: string) => {
            if (status === kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              marker.current?.setPosition(latlng);
              onSelectLocation(lat, lng, address);
            }
          });
        });

        // 초기 위치 주소 가져오기
        geocoder.current?.coord2Address(initialCenter.lng, initialCenter.lat, (result: any, status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            onSelectLocation(initialCenter.lat, initialCenter.lng, address);
          }
        });
      };

      if (!(window as any).kakao) {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => (window as any).kakao.maps.load(loadMap);
        document.head.appendChild(script);
      } else {
        (window as any).kakao.maps.load(loadMap);
      }
    }, [initialCenter, onSelectLocation]);

    // 외부에서 center prop 변경 시 지도 이동
    useEffect(() => {
      if (center && mapInstance.current && marker.current) {
        const { kakao } = window as any;
        const moveLatLng = new kakao.maps.LatLng(center.lat, center.lng);
        mapInstance.current.setCenter(moveLatLng);
        marker.current.setPosition(moveLatLng);
      }
    }, [center]);

    // 관광지 마커 표시
    useEffect(() => {
      if (!mapInstance.current) return;

      const { kakao } = window as any;

      // 기존 관광지 마커 제거
      tourMarkers.current.forEach((m) => m.setMap(null));
      tourMarkers.current = [];

      if (tourItems && tourItems.length > 0) {
        tourItems.forEach((item: any) => {
          if (item.mapy && item.mapx) {
            const position = new kakao.maps.LatLng(item.mapy, item.mapx);
            const m = new kakao.maps.Marker({ position });
            m.setMap(mapInstance.current);
            tourMarkers.current.push(m);

            const iw = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${item.title}</div>`,
            });

            kakao.maps.event.addListener(m, "mouseover", () => iw.open(mapInstance.current, m));
            kakao.maps.event.addListener(m, "mouseout", () => iw.close());
          }
        });
      }
    }, [tourItems]);

    // 외부 제어 메서드
    useImperativeHandle(ref, () => ({
      moveToAddress: (address: string) => {
        if (!geocoder.current || !mapInstance.current || !marker.current) return;

        geocoder.current.addressSearch(address, (result: any, status: string) => {
          if (status === (window as any).kakao.maps.services.Status.OK) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);
            const moveLatLng = new (window as any).kakao.maps.LatLng(lat, lng);
            mapInstance.current.setCenter(moveLatLng);
            marker.current.setPosition(moveLatLng);
            onSelectLocation(lat, lng, address);
          }
        });
      },
      moveToLatLng: (lat: number, lng: number) => {
        if (!mapInstance.current || !marker.current) return;

        const moveLatLng = new (window as any).kakao.maps.LatLng(lat, lng);
        mapInstance.current.setCenter(moveLatLng);
        marker.current.setPosition(moveLatLng);

        if (geocoder.current) {
          geocoder.current.coord2Address(lng, lat, (result: any, status: string) => {
            if (status === (window as any).kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              onSelectLocation(lat, lng, address);
            }
          });
        }
      }
    }));

    return <div ref={mapRef} style={{ width: "100%", height: height, borderRadius: "0.2rem" }} />;
  }
);

KakaoMap.displayName = "KakaoMap";

export default KakaoMap;