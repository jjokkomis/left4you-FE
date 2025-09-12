'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import type { KakaoMapHandle, MapProps } from "@/types/types";
import useTourItems from "@/hooks/useTourItems"; // 훅 경로 확인

declare global {
  interface Window { kakao: any }
}

const KakaoMap = forwardRef<KakaoMapHandle, MapProps & { height?: string }>(
  ({ onSelectLocation, center, height = "400px" }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<kakao.maps.Map | null>(null);
    const marker = useRef<kakao.maps.Marker | null>(null);
    const geocoder = useRef<kakao.maps.services.Geocoder | null>(null);
    const tourMarkers = useRef<kakao.maps.Marker[]>([]);

    const [initialCenter, setInitialCenter] = useState<{ lat: number; lng: number } | null>(null);

    // 현재 위치 기반 초기 중심
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

    // API로 관광지 가져오기
    const { items: tourItems } = useTourItems(initialCenter?.lat ?? null, initialCenter?.lng ?? null);

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
      if (!mapInstance.current || !tourItems) return;

      // 기존 마커 제거
      tourMarkers.current.forEach((m) => m.setMap(null));
      tourMarkers.current = [];

      tourItems.forEach((item: any) => {
        if (item.mapy && item.mapx) {
          const position = new window.kakao.maps.LatLng(item.mapy, item.mapx);
          const m = new window.kakao.maps.Marker({ position });
          m.setMap(mapInstance.current);
          tourMarkers.current.push(m);

          const iw = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${item.title}</div>`,
          });

          window.kakao.maps.event.addListener(m, "mouseover", () => iw.open(mapInstance.current, m));
          window.kakao.maps.event.addListener(m, "mouseout", () => iw.close());
        }
      });
    }, [tourItems]);

    // 외부 제어 메서드
    useImperativeHandle(ref, () => ({
      moveToAddress: (address: string) => {
        if (!geocoder.current || !mapInstance.current || !marker.current) return;

        geocoder.current.addressSearch(address, (result: any, status: string) => {
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
          geocoder.current.coord2Address(lng, lat, (result: any, status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              onSelectLocation(lat, lng, address);
            }
          });
        }
      }
    }));

    return <div ref={mapRef} style={{ width: "100%", height, borderRadius: "0.2rem" }} />;
  }
);

export default KakaoMap;
